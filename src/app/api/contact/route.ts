import { NextRequest, NextResponse } from 'next/server';
import { contactFormLimiter, checkRateLimit } from '@/lib/rate-limiter';
import { sanitizeContactForm, logSecurityEvent } from '@/lib/input-sanitizer';
import { emailQueue } from '@/lib/email-queue';
import { getAdminNotificationTemplate, getAutoReplyTemplate } from '@/lib/email-templates';

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://wrenchit.io' 
    : 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: { ...corsHeaders, ...securityHeaders },
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIp = request.ip || 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    'unknown';

  try {
    // Check rate limiting
    const rateLimitCheck = await checkRateLimit(contactFormLimiter, { ip: clientIp });
    if (!rateLimitCheck.success) {
      logSecurityEvent('rate_limit_exceeded', {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
        retryAfter: rateLimitCheck.retryAfter,
      });

      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitCheck.retryAfter,
        },
        { 
          status: 429,
          headers: {
            ...corsHeaders,
            ...securityHeaders,
            'Retry-After': rateLimitCheck.retryAfter?.toString() || '300',
          },
        }
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
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400, headers: { ...corsHeaders, ...securityHeaders } }
      );
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
        { status: 400, headers: { ...corsHeaders, ...securityHeaders } }
      );
    }

    const contactData = sanitizationResult.data!;

    // Check for required environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service is not properly configured' },
        { status: 500, headers: { ...corsHeaders, ...securityHeaders } }
      );
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
      delay: 2000, // 2 second delay
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
        headers: { ...corsHeaders, ...securityHeaders },
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
        headers: { ...corsHeaders, ...securityHeaders },
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
      headers: { ...corsHeaders, ...securityHeaders },
    }
  );
}
