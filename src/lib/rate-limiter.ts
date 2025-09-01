import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter for contact form submissions
export const contactFormLimiter = new RateLimiterMemory({
  points: 3, // Number of requests
  duration: 300, // Per 5 minutes (300 seconds)
  blockDuration: 900, // Block for 15 minutes if limit exceeded
});

// Rate limiter for general API endpoints
export const generalApiLimiter = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 900, // Per 15 minutes
  blockDuration: 300, // Block for 5 minutes if limit exceeded
});

// Type for successful rate limit check
interface RateLimitSuccess {
  success: true;
}

// Type for failed rate limit check
interface RateLimitFailure {
  success: false;
  error: string;
  retryAfter: number;
}

// Function to check rate limit
export async function checkRateLimit(limiter: RateLimiterMemory, req: any): Promise<RateLimitSuccess | RateLimitFailure> {
  try {
    await limiter.consume(req.ip || 'anonymous');
    return { success: true };
  } catch (rateLimiterRes: any) {
    const remainingTime = Math.round(rateLimiterRes.msBeforeNext / 1000) || 1;
    return {
      success: false,
      error: 'Too many requests',
      retryAfter: remainingTime,
    };
  }
}