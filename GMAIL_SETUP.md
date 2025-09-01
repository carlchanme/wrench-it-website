# Gmail SMTP Contact Form Setup Guide

This guide provides complete instructions for setting up the Gmail SMTP contact form with nodemailer in your WrenchIt website.

## 📧 Gmail Configuration

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click on **2-Step Verification**
3. Follow the prompts to enable 2FA if not already enabled
4. **Note**: App Passwords require 2-Factor Authentication to be enabled

### Step 2: Generate Gmail App Password

1. Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: **WrenchIt Website**
5. Click **Generate**
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)
7. **Important**: Save this password securely - you won't be able to see it again

### Step 3: Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Admin Email (where contact forms are sent)
ADMIN_EMAIL=carl@wrenchit.io
```

**Example:**
```env
GMAIL_USER=hello@wrenchit.io
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=carl@wrenchit.io
```

## 🔧 Development Setup

### Step 1: Install Dependencies

Dependencies are already installed from the previous setup:
- `nodemailer` - Email sending
- `@types/nodemailer` - TypeScript definitions
- `rate-limiter-flexible` - Rate limiting
- `dompurify` - Input sanitization
- `validator` - Email validation
- `jsdom` - Server-side DOM manipulation

### Step 2: Test Configuration

Create a test script to verify your setup:

```bash
# Create test file
touch test-email.js
```

Add this content to `test-email.js`:

```javascript
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  try {
    console.log('🧪 Testing Gmail SMTP configuration...');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    const result = await transporter.sendMail({
      from: `"WrenchIt Test" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: '🧪 Test Email from WrenchIt Website',
      html: `
        <h2>Test Email Successful!</h2>
        <p>Your Gmail SMTP configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    console.log('📧 Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('💡 Authentication failed. Check your Gmail credentials.');
    } else if (error.code === 'ECONNECTION') {
      console.error('💡 Connection failed. Check your internet connection.');
    }
  }
}

testEmail();
```

Run the test:
```bash
node test-email.js
```

Expected output:
```
🧪 Testing Gmail SMTP configuration...
✅ SMTP connection verified successfully!
📧 Test email sent successfully!
Message ID: <some-message-id@gmail.com>
```

### Step 3: Start Development Server

```bash
npm run dev
```

The contact form API will be available at:
- `http://localhost:3000/api/contact` (POST)
- `http://localhost:3000/api/contact` (GET - health check)

## 🧪 Testing the Contact Form

### Method 1: Using curl

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Contact Form",
    "message": "This is a test message to verify the contact form is working correctly."
  }'
```

### Method 2: Using the Frontend Form

1. Navigate to your contact page
2. Fill out the form with test data
3. Submit the form
4. Check for:
   - Success message on frontend
   - Admin notification email in your inbox
   - Auto-reply email in test email inbox

### Method 3: API Health Check

```bash
curl http://localhost:3000/api/contact
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "emailQueue": {
    "total": 0,
    "pending": 0,
    "processing": 0,
    "completed": 0,
    "failed": 0
  },
  "environment": "development",
  "gmailConfigured": true
}
```

## 🔒 Security Features

### Rate Limiting
- **Contact Form**: 3 submissions per 5 minutes per IP
- **General API**: 100 requests per 15 minutes per IP
- Blocked IPs are temporarily banned

### Input Sanitization
- HTML tags stripped from all inputs
- XSS prevention with DOMPurify
- SQL injection pattern detection
- Suspicious content filtering
- Email format validation

### CORS Configuration
- Production: `https://wrenchit.io`
- Development: `http://localhost:3000`
- Proper preflight handling

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Email Queue System

The system includes a reliable email queue that:
- Processes emails asynchronously
- Retries failed emails (max 3 attempts)
- Logs all email operations
- Handles Gmail rate limits
- Provides queue status monitoring

### Monitoring Email Queue

```bash
# Check queue status
curl http://localhost:3000/api/contact
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Error (535 5.7.8)
**Error**: `Invalid credentials`
**Solution**:
- Verify Gmail App Password is correct (16 characters)
- Ensure 2FA is enabled on Gmail account
- Check `.env.local` file has correct `GMAIL_USER` and `GMAIL_APP_PASSWORD`

#### 2. Connection Refused
**Error**: `ECONNREFUSED`
**Solution**:
- Check internet connection
- Verify Gmail SMTP isn't blocked by firewall
- Try using port 465 (SSL) or 587 (TLS)

#### 3. Rate Limit Exceeded
**Error**: `Too many requests`
**Solution**:
- Wait for rate limit to reset
- Check if multiple requests are being sent
- Monitor `/api/contact` health endpoint

#### 4. Emails Not Sending
**Possible Causes**:
- Gmail App Password expired or revoked
- Gmail account security settings changed
- SMTP connection blocked

**Debug Steps**:
1. Run the test email script
2. Check server logs for detailed errors
3. Verify environment variables are loaded
4. Test with a different Gmail account

### Debug Mode

Enable debug logging in development:

```env
# .env.local
DEBUG_EMAILS=true
NODE_ENV=development
```

This will log detailed information about:
- SMTP connection attempts
- Email queue processing
- Rate limiting decisions
- Security events

### Error Logs Location

Errors are logged to:
- Console (development)
- Server logs (production)
- Security events are specially marked with 🚨

## 🏗️ Production Deployment

### Vercel Environment Variables

In your Vercel Dashboard, add these environment variables:

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=carl@wrenchit.io
NEXT_PUBLIC_SITE_URL=https://wrenchit.io
```

### Security Considerations

1. **Never commit credentials** to version control
2. **Use different Gmail accounts** for development/production
3. **Monitor rate limits** in production
4. **Set up alerts** for failed emails
5. **Regular security audits** of dependencies

### Production Testing

After deployment:

1. Test contact form on live site
2. Verify emails are delivered
3. Check Vercel function logs
4. Monitor error rates
5. Test rate limiting

## 📈 Monitoring & Analytics

### Email Delivery Tracking

The system logs:
- Successful submissions
- Failed delivery attempts
- Rate limit violations
- Security events
- Processing times

### Performance Metrics

Monitor these metrics:
- Email delivery time
- Queue processing speed
- Rate limit hit rates
- Error rates by type

## 🔄 Maintenance

### Regular Tasks

1. **Update dependencies** monthly
2. **Review security logs** weekly
3. **Test email delivery** weekly
4. **Check Gmail quota** monthly
5. **Update App Passwords** annually

### Gmail Quota Limits

Gmail SMTP has these limits:
- **Free Gmail**: 500 emails/day
- **Google Workspace**: 2000 emails/day

Monitor usage and upgrade if needed.

## 📞 Support

If you encounter issues:

1. **Check this guide** for solutions
2. **Review error logs** for specific errors
3. **Test with simple curl commands**
4. **Verify Gmail configuration**

For additional help:
- Email: carl@wrenchit.io
- Documentation: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- Gmail SMTP: [Google Support](https://support.google.com/mail/answer/7126229)

---

✅ **Setup Complete!** Your Gmail SMTP contact form is now ready for production use.