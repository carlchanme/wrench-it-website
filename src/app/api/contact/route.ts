import { NextRequest, NextResponse } from 'next/server';
import { contactFormLimiter, checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeContactForm, logSecurityEvent } from '@/lib/input-sanitizer';
import { emailQueue } from '@/lib/email-queue';
import { getAdminNotificationTemplate, getAutoReplyTemplate } from '@/lib/email-templates';

// Constants
const RATE_LIMIT_RETRY_AFTER = '300';
const AUTO_REPLY_DELAY = 2000;

// Combined headers for consistent usage
const DEFAULT_HEADERS = {
  // CORS headers
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://wrenchit.io' 
    : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
  // Security headers
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Helper functions
function getClientIp(request: NextRequest): string {
  return request.ip || 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    'unknown';
}

function createErrorResponse(message: string, status: number, retryAfter?: string) {
  const headers: Record<string, string> = { ...DEFAULT_HEADERS };
  if (retryAfter) {
    headers['Retry-After'] = retryAfter;
  }
  
  return NextResponse.json(
    { error: message, ...(retryAfter && { retryAfter }) },
    { status, headers }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: DEFAULT_HEADERS,
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = getClientIp(request);

  try {
    // Check rate limiting
    const rateLimitCheck = await checkRateLimit(contactFormLimiter, { ip: clientIp });
    if (!rateLimitCheck.success) {
      logSecurityEvent('rate_limit_exceeded', {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
        retryAfter: rateLimitCheck.retryAfter,
      });

      return createErrorResponse(
        'Too many requests. Please try again later.',
        429,
        rateLimitCheck.retryAfter?.toString() || RATE_LIMIT_RETRY_AFTER
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      logSecurityEvent('invalid_json', { 
        ip: clientIp, 
        error: error instanceof Error ? error.message : 'Unknown parsing error'
      });
      return createErrorResponse('Invalid JSON in request body', 400);
    }

    // Sanitize and validate input
    const sanitizationResult = sanitizeContactForm(body);
    if (!sanitizationResult.success) {
      logSecurityEvent('validation_failed', {
        ip: clientIp,
        errors: sanitizationResult.errors,
        originalData: body,
      });

      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: sanitizationResult.errors,
        },
        { status: 400, headers: DEFAULT_HEADERS }
      );
    }

    const contactData = sanitizationResult.data!;

    // Check for required environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail SMTP credentials not configured');
      return createErrorResponse('Email service is not properly configured', 500);
    }

    // Generate email templates
    const adminTemplate = getAdminNotificationTemplate(contactData);
    const autoReplyTemplate = getAutoReplyTemplate(contactData);

    // Queue admin notification email
    const adminEmailId = emailQueue.addEmail({
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text,
    });

    // Queue auto-reply email (with slight delay to ensure admin email goes first)
    const autoReplyEmailId = emailQueue.addEmail({
      to: contactData.email,
      subject: autoReplyTemplate.subject,
      html: autoReplyTemplate.html,
      text: autoReplyTemplate.text,
      delay: AUTO_REPLY_DELAY,
    });

    // Log successful submission
    console.log(`📧 Contact form submitted successfully:`, {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      ip: clientIp,
      adminEmailId,
      autoReplyEmailId,
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully! You should receive a confirmation email shortly.',
        emailIds: {
          admin: adminEmailId,
          autoReply: autoReplyEmailId,
        },
      },
      { 
        status: 200,
        headers: DEFAULT_HEADERS,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('❌ Contact form API error:', error);
    
    logSecurityEvent('api_error', {
      ip: clientIp,
      error: errorMessage,
      stack: errorStack,
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        timestamp: new Date().toISOString(),
      },
      { 
        status: 500,
        headers: DEFAULT_HEADERS,
      }
    );
  }
}

// Health check endpoint
export async function GET() {
  const queueStatus = emailQueue.getQueueStatus();
  
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      emailQueue: queueStatus,
      environment: process.env.NODE_ENV,
      gmailConfigured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
    },
    { 
      status: 200,
      headers: DEFAULT_HEADERS,
    }
  );
}
