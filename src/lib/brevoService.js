// src/lib/brevoService.js
// Brevo (Sendinblue) Email Service Integration

const BREVO_API_KEY = 'xsmtpsib-12f061b3ecca73d776fcfae9c9b205d1b04975921b2';
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

/**
 * Send OTP email using Brevo API
 * @param {string} toEmail - Recipient email address
 * @param {string} otp - One-time password
 * @param {string} userName - User's name (optional)
 * @returns {Promise<Object>} Response object
 */
export const sendOtpEmail = async (toEmail, otp, userName = 'User') => {
  try {
    const emailData = {
      sender: {
        name: 'Litterateur',
        email: 'noreply@litterateur.app'
      },
      to: [
        {
          email: toEmail,
          name: userName
        }
      ],
      subject: 'Your Verification Code from Litterateur',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code - Litterateur</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #2ecc71;
              margin-bottom: 10px;
            }
            .otp-code {
              background: #f8f9fa;
              border: 2px dashed #2ecc71;
              padding: 20px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-number {
              font-size: 36px;
              font-weight: bold;
              color: #2ecc71;
              letter-spacing: 5px;
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
            .security-note {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌿 Litterateur</div>
              <h2>Where Culinary Art Meets Literary Excellence</h2>
            </div>
            
            <p>Hello ${userName},</p>
            
            <p>You requested a verification code to sign in to your Litterateur account. Please use the code below to complete your authentication:</p>
            
            <div class="otp-code">
              <p><strong>Your Verification Code:</strong></p>
              <div class="otp-number">${otp}</div>
            </div>
            
            <div class="security-note">
              <strong>🔒 Security Notice:</strong><br>
              This code will expire in <strong>10 minutes</strong>. Please do not share this code with anyone. If you didn't request this code, please ignore this email.
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            
            <div class="footer">
              <p>Best regards,<br>
              The Litterateur Team</p>
              <p style="font-size: 12px; color: #999;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API Error: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'OTP email sent successfully via Brevo'
    };
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP email'
    };
  }
};

/**
 * Send welcome email after successful registration/login
 * @param {string} toEmail - Recipient email address
 * @param {string} userName - User's name
 * @returns {Promise<Object>} Response object
 */
export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const emailData = {
      sender: {
        name: 'Litterateur',
        email: 'noreply@litterateur.app'
      },
      to: [
        {
          email: toEmail,
          name: userName
        }
      ],
      subject: 'Welcome to Litterateur! 🌿',
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Litterateur</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #2ecc71;
              margin-bottom: 10px;
            }
            .welcome-text {
              font-size: 24px;
              color: #2c3e50;
              text-align: center;
              margin: 20px 0;
            }
            .features {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .feature-item {
              margin: 10px 0;
              padding-left: 20px;
            }
            .cta-button {
              display: inline-block;
              background: #2ecc71;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 25px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌿 Litterateur</div>
            </div>
            
            <div class="welcome-text">
              Welcome to Litterateur, ${userName}! 🎉
            </div>
            
            <p>We're excited to have you join our community where culinary art meets literary excellence.</p>
            
            <div class="features">
              <h3>What you can do with Litterateur:</h3>
              <div class="feature-item">🍽️ Explore our curated menu</div>
              <div class="feature-item">📚 Discover literary-inspired dishes</div>
              <div class="feature-item">🎯 Earn rewards with every visit</div>
              <div class="feature-item">📱 Track orders and reservations</div>
            </div>
            
            <div style="text-align: center;">
              <a href="https://new-website-1ce.pages.dev/dashboard" class="cta-button">
                Go to Your Dashboard
              </a>
            </div>
            
            <p>If you have any questions, our support team is here to help you.</p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
              <p>Best regards,<br>
              The Litterateur Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API Error: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Welcome email sent successfully'
    };
  } catch (error) {
    console.error('Error sending welcome email via Brevo:', error);
    return {
      success: false,
      error: error.message || 'Failed to send welcome email'
    };
  }
};
