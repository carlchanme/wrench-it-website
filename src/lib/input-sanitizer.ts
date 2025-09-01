import { JSDOM } from 'jsdom';
import validator from 'validator';

// Create DOMPurify instance for server-side use
const window = new JSDOM('').window;
const createDOMPurify = require('dompurify');
const purify = createDOMPurify(window);

export interface SanitizedContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export function sanitizeContactForm(data: any): {
  success: boolean;
  data?: SanitizedContactData;
  errors?: string[];
} {
  const errors: string[] = [];

  // Validate required fields
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required and must be a string');
  }
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Subject is required and must be a string');
  }
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required and must be a string');
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  // Sanitize and validate data
  const sanitizedData: SanitizedContactData = {
    name: sanitizeText(data.name, 100),
    email: sanitizeEmail(data.email),
    subject: sanitizeText(data.subject, 200),
    message: sanitizeText(data.message, 5000),
  };

  // Optional fields
  if (data.company && typeof data.company === 'string') {
    sanitizedData.company = sanitizeText(data.company, 100);
  }
  if (data.phone && typeof data.phone === 'string') {
    sanitizedData.phone = sanitizePhone(data.phone);
  }

  // Additional validation
  if (!validator.isEmail(sanitizedData.email)) {
    errors.push('Invalid email address format');
  }

  if (sanitizedData.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (sanitizedData.subject.length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }

  if (sanitizedData.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Check for suspicious content
  if (containsSuspiciousContent(sanitizedData.message) ||
      containsSuspiciousContent(sanitizedData.subject)) {
    errors.push('Content contains suspicious elements');
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data: sanitizedData };
}

function sanitizeText(text: string, maxLength: number): string {
  // Remove any HTML tags and decode entities
  let cleaned = purify.sanitize(text, { ALLOWED_TAGS: [] });

  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Truncate to max length
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }

  return cleaned;
}

function sanitizeEmail(email: string): string {
  // Basic sanitization for email
  return validator.normalizeEmail(email.trim().toLowerCase()) || email.trim().toLowerCase();
}

function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +, -, (, ), and spaces
  return phone.replace(/[^\d+\-()s]/g, '').trim();
}

function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    // Script injection
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    // SQL injection patterns
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b.*(\b(FROM|INTO|SET|WHERE|HAVING)\b))/gi,
    // Common spam phrases
    /\b(viagra|cialis|loan|debt|casino|poker|lottery|winner)\b/gi,
    // Excessive links
    /(https?:\/\/[^\s]+.*){3,}/gi,
    // Excessive special characters
    /[!@#$%^&*()_+=[{}|;':"\\,.<>?]{10,}/gi,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(text));
}

export function logSecurityEvent(eventType: string, details: any, ip?: string): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: eventType,
    ip: ip || 'unknown',
    details,
    userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : 'server',
  };

  console.warn('🚨 SECURITY EVENT:', JSON.stringify(logEntry, null, 2));

  // In production, you might want to send this to a security monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to external logging service
    // await fetch('/api/security-log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logEntry)
    // });
  }
}
