interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

// Admin notification email template
export function getAdminNotificationTemplate(data: ContactFormData) {
  return {
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
          .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .field-value { color: #333; }
          .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Contact Form Submission</h2>
            <p>You have received a new message through your website contact form.</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 Name:</div>
              <div class="field-value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">📧 Email:</div>
              <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">📋 Subject:</div>
              <div class="field-value">${data.subject}</div>
            </div>
            
            ${data.company ? `
            <div class="field">
              <div class="field-label">🏢 Company:</div>
              <div class="field-value">${data.company}</div>
            </div>
            ` : ''}
            
            ${data.phone ? `
            <div class="field">
              <div class="field-label">📞 Phone:</div>
              <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="field-label">💬 Message:</div>
              <div class="message-box">${data.message}</div>
            </div>
            
            <div class="field">
              <div class="field-label">⏰ Submitted:</div>
              <div class="field-value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
${data.company ? `Company: ${data.company}` : ''}
${data.phone ? `Phone: ${data.phone}` : ''}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
    `.trim(),
  };
}

// Auto-reply email template
export function getAutoReplyTemplate(data: ContactFormData) {
  return {
    subject: `Thank you for contacting WrenchIt - We'll be in touch soon!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting WrenchIt</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
          .highlight { background: white; padding: 20px; border-radius: 4px; border-left: 4px solid #667eea; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .cta { background: #667eea; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block; margin: 20px 0; }
          .social-links { margin-top: 20px; }
          .social-links a { margin: 0 10px; color: #667eea; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🔧 WrenchIt</div>
            <h2>Thank you for reaching out!</h2>
            <p>Professional Software Development & AI Automation</p>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            
            <p>Thank you for contacting WrenchIt! We've successfully received your message and truly appreciate you taking the time to reach out to us.</p>
            
            <div class="highlight">
              <h3>📋 Your Inquiry Summary:</h3>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>🔍 Our team will review your message within 24 hours</li>
              <li>📞 We'll reach out to discuss your project requirements</li>
              <li>💡 You'll receive a customized solution proposal</li>
              <li>🚀 We'll help bring your vision to life</li>
            </ul>
            
            <p>While you wait, feel free to explore our services and portfolio:</p>
            
            <div style="text-align: center;">
              <a href="https://wrenchit.io/services" class="cta">View Our Services</a>
              <a href="https://wrenchit.io/portfolio" class="cta">See Our Work</a>
            </div>
            
            <div class="highlight">
              <h3>🚨 Urgent Project?</h3>
              <p>If your project is time-sensitive, please call us directly at <strong>(555) 123-TECH</strong> or email <a href="mailto:carl@wrenchit.io">carl@wrenchit.io</a> for immediate assistance.</p>
            </div>
            
            <p>Best regards,<br>
            <strong>Carl Rodriguez</strong><br>
            Lead Developer & Founder<br>
            WrenchIt - Professional Software Development</p>
            
            <div class="social-links">
              <a href="https://linkedin.com/company/wrenchit">LinkedIn</a> |
              <a href="https://github.com/wrenchit-io">GitHub</a> |
              <a href="https://wrenchit.io/blog">Blog</a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>WrenchIt | Professional Software Development & AI Automation</p>
            <p>📧 <a href="mailto:hello@wrenchit.io">hello@wrenchit.io</a> | 🌐 <a href="https://wrenchit.io">wrenchit.io</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${data.name},

Thank you for contacting WrenchIt! We've successfully received your message and truly appreciate you taking the time to reach out to us.

Your Inquiry Summary:
Subject: ${data.subject}
Submitted: ${new Date().toLocaleString()}

What happens next?
• Our team will review your message within 24 hours
• We'll reach out to discuss your project requirements
• You'll receive a customized solution proposal
• We'll help bring your vision to life

While you wait, feel free to explore our services at https://wrenchit.io/services

Urgent Project? If your project is time-sensitive, please call us directly at (555) 123-TECH or email carl@wrenchit.io for immediate assistance.

Best regards,
Carl Rodriguez
Lead Developer & Founder
WrenchIt - Professional Software Development

---
This is an automated response. Please do not reply to this email.
WrenchIt | hello@wrenchit.io | wrenchit.io
    `.trim(),
  };
}