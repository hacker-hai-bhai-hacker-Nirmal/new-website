globalThis.process ??= {}; globalThis.process.env ??= {};
const BREVO_API_KEY = undefined                             ;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const sendOtpEmail = async (toEmail, otp, userName = "User", apiKey = null) => {
  try {
    const effectiveApiKey2 = apiKey || BREVO_API_KEY;
    if (!effectiveApiKey2) {
      throw new Error("Brevo API key is required but not provided");
    }
    console.log("🔑 Using Brevo API key, length:", effectiveApiKey2.length);
    const emailData = {
      sender: {
        name: "Litterateur",
        email: "nirmalbajiya@gmail.com"
        // Use verified Gmail sender
      },
      to: [
        {
          email: toEmail,
          name: userName
        }
      ],
      subject: "Your Verification Code from Litterateur",
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": effectiveApiKey2
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
      message: "OTP email sent successfully via Brevo"
    };
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    return {
      success: false,
      error: error.message || "Failed to send OTP email"
    };
  }
};

export { sendOtpEmail as s };
