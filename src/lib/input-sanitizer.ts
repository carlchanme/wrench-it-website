import { JSDOM } from 'jsdom';
import validator from 'validator';

// Constants
const MIN_NAME_LENGTH = 2;
const MIN_SUBJECT_LENGTH = 5;
const MIN_MESSAGE_LENGTH = 10;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_COMPANY_LENGTH = 100;
const EXCESSIVE_LINKS_COUNT = 3;
const EXCESSIVE_SPECIAL_CHARS_COUNT = 10;

// Create DOMPurify instance for server-side use
const { window } = new JSDOM('');
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

interface RawContactData {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  phone?: unknown;
}

// Type for successful validation result
interface ValidationSuccess {
  success: true;
  data: SanitizedContactData;
}

// Type for failed validation result
interface ValidationFailure {
  success: false;
  errors: string[];
}

export function sanitizeContactForm(data: RawContactData): ValidationSuccess | ValidationFailure {
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
    name: sanitizeText(data.name as string, MAX_NAME_LENGTH),
    email: sanitizeEmail(data.email as string),
    subject: sanitizeText(data.subject as string, MAX_SUBJECT_LENGTH),
    message: sanitizeText(data.message as string, MAX_MESSAGE_LENGTH),
  };

  // Optional fields
  if (data.company && typeof data.company === 'string') {
    sanitizedData.company = sanitizeText(data.company, MAX_COMPANY_LENGTH);
  }
  if (data.phone && typeof data.phone === 'string') {
    sanitizedData.phone = sanitizePhone(data.phone);
  }

  // Additional validation
  if (!validator.isEmail(sanitizedData.email)) {
    errors.push('Invalid email address format');
  }

  if (sanitizedData.name.length < MIN_NAME_LENGTH) {
    errors.push(`Name must be at least ${MIN_NAME_LENGTH} characters long`);
  }

  if (sanitizedData.subject.length < MIN_SUBJECT_LENGTH) {
    errors.push(`Subject must be at least ${MIN_SUBJECT_LENGTH} characters long`);
  }

  if (sanitizedData.message.length < MIN_MESSAGE_LENGTH) {
    errors.push(`Message must be at least ${MIN_MESSAGE_LENGTH} characters long`);
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

// Suspicious content patterns
const SCRIPT_INJECTION_PATTERN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const SQL_INJECTION_PATTERN = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b.*(\b(FROM|INTO|SET|WHERE|HAVING)\b))/gi;
const SPAM_PHRASES_PATTERN = /\b(viagra|cialis|loan|debt|casino|poker|lottery|winner)\b/gi;
const EXCESSIVE_LINKS_PATTERN = new RegExp(`(https?:\\/\\/[^\\s]+.*){${EXCESSIVE_LINKS_COUNT},}`, 'gi');
const EXCESSIVE_SPECIAL_CHARS_PATTERN = new RegExp(`[!@#$%^&*()_+=\\[{}|;':"\\\\,.<>?]{${EXCESSIVE_SPECIAL_CHARS_COUNT},}`, 'gi');

function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    SCRIPT_INJECTION_PATTERN,
    SQL_INJECTION_PATTERN,
    SPAM_PHRASES_PATTERN,
    EXCESSIVE_LINKS_PATTERN,
    EXCESSIVE_SPECIAL_CHARS_PATTERN,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(text));
}

interface SecurityEventDetails {
  [key: string]: unknown;
}

export function logSecurityEvent(eventType: string, details: SecurityEventDetails, ip?: string): void {
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
