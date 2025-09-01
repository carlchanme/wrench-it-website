const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  try {
    console.log('🧪 Testing Gmail SMTP configuration...');
    
    // Check required environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing Gmail credentials. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local');
    }
    
    console.log(`📧 Using Gmail account: ${process.env.GMAIL_USER}`);
    console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || process.env.GMAIL_USER}`);
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    console.log('🔌 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    console.log('📤 Sending test email...');
    const result = await transporter.sendMail({
      from: `"WrenchIt Test" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: '🧪 Test Email from WrenchIt Website Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1>🧪 Test Email Successful!</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Gmail SMTP Configuration Working ✅</h2>
            <p>Your Gmail SMTP configuration for the WrenchIt website contact form is working correctly.</p>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Test Details:</h3>
              <ul>
                <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
                <li><strong>Gmail Account:</strong> ${process.env.GMAIL_USER}</li>
                <li><strong>Admin Email:</strong> ${process.env.ADMIN_EMAIL || process.env.GMAIL_USER}</li>
                <li><strong>Node Environment:</strong> ${process.env.NODE_ENV || 'development'}</li>
              </ul>
            </div>
            
            <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #007acc;">
              <h4>🔧 Next Steps:</h4>
              <ol>
                <li>Start your development server: <code>npm run dev</code></li>
                <li>Test the contact form at: <code>http://localhost:3000/contact</code></li>
                <li>Check the API health at: <code>http://localhost:3000/api/contact</code></li>
              </ol>
            </div>
            
            <p style="text-align: center; margin-top: 20px;">
              <strong>🚀 Your contact form is ready for production!</strong>
            </p>
          </div>
        </div>
      `,
      text: `
🧪 Test Email Successful!

Your Gmail SMTP configuration for the WrenchIt website contact form is working correctly.

Test Details:
- Timestamp: ${new Date().toISOString()}
- Gmail Account: ${process.env.GMAIL_USER}
- Admin Email: ${process.env.ADMIN_EMAIL || process.env.GMAIL_USER}
- Node Environment: ${process.env.NODE_ENV || 'development'}

Next Steps:
1. Start your development server: npm run dev
2. Test the contact form at: http://localhost:3000/contact
3. Check the API health at: http://localhost:3000/api/contact

🚀 Your contact form is ready for production!
      `.trim(),
    });

    console.log('📧 Test email sent successfully!');
    console.log('📨 Message ID:', result.messageId);
    console.log('📬 Check your inbox at:', process.env.ADMIN_EMAIL || process.env.GMAIL_USER);
    console.log('');
    console.log('🎉 Gmail SMTP setup is complete and working!');
    console.log('');
    console.log('📋 Quick Start:');
    console.log('  1. npm run dev');
    console.log('  2. Visit http://localhost:3000/contact');
    console.log('  3. Fill out the contact form');
    console.log('  4. Check for both admin notification and auto-reply emails');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('');
    console.log('🔍 Troubleshooting:');
    
    if (error.code === 'EAUTH') {
      console.error('💡 Authentication failed. Please check:');
      console.error('   - Gmail App Password is correct (16 characters)');
      console.error('   - 2-Factor Authentication is enabled on your Gmail account');
      console.error('   - GMAIL_USER and GMAIL_APP_PASSWORD are set in .env.local');
      console.error('   - App Password was generated recently (they can expire)');
    } else if (error.code === 'ECONNECTION') {
      console.error('💡 Connection failed. Please check:');
      console.error('   - Internet connection is working');
      console.error('   - Firewall isn\'t blocking Gmail SMTP (port 465/587)');
      console.error('   - VPN isn\'t interfering with the connection');
    } else if (error.code === 'ENOTFOUND') {
      console.error('💡 DNS resolution failed. Please check:');
      console.error('   - Internet connection is working');
      console.error('   - DNS settings are correct');
    } else {
      console.error('💡 General troubleshooting:');
      console.error('   - Verify .env.local file exists and has correct values');
      console.error('   - Check Gmail account security settings');
      console.error('   - Try regenerating the Gmail App Password');
      console.error('   - Review the Gmail SMTP setup guide in GMAIL_SETUP.md');
    }
    
    console.log('');
    console.log('📖 For detailed setup instructions, see: GMAIL_SETUP.md');
    console.log('📧 Need help? Contact: carl@wrenchit.io');
  }
}

console.log('🔧 WrenchIt Contact Form - Gmail SMTP Test');
console.log('==========================================');
testEmail();