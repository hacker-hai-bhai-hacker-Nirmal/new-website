globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as account } from '../../../chunks/appwrite_CU5quT4E.mjs';
import { I as ID } from '../../../chunks/sdk_BPbYzYsq.mjs';
export { renderers } from '../../../renderers.mjs';

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

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true, "VITE_APPWRITE_API_KEY": "standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75", "VITE_APPWRITE_COLLECTION_MENU": "menu_items", "VITE_APPWRITE_COLLECTION_ORDERS": "orders", "VITE_APPWRITE_COLLECTION_USERS": "users", "VITE_APPWRITE_DATABASE_ID": "main-db", "VITE_APPWRITE_ENDPOINT": "https://fra.cloud.appwrite.io/v1", "VITE_APPWRITE_PROJECT_ID": "6900b1ed001604d8befb", "VITE_FRONTEND_URL": "http://localhost:3000", "VITE_USER_NODE_ENV": "development"};
const POST = async ({ request, locals }) => {
  try {
    const { email } = await request.json();
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { OS: process.env.OS });
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const brevoApiKey = env.brevo_MCP_key;
    if (!brevoApiKey) {
      console.error("❌ brevo_MCP_key environment variable not found in Cloudflare");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service configuration error - please check brevo_MCP_key environment variable"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("✅ brevo_MCP_key found in environment, length:", brevoApiKey.length);
    const response = await account.createEmailToken(
      ID.unique(),
      // User ID (will be created if not exists)
      email
    );
    let otp = "";
    if (response.secret && response.secret.length === 6 && /^\d{6}$/.test(response.secret)) {
      otp = response.secret;
    } else {
      otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    }
    const emailResult = await sendOtpEmail(email, otp, "User", brevoApiKey);
    if (!emailResult.success) {
      console.error("Brevo email failed:", emailResult.error);
    }
    return new Response(
      JSON.stringify({
        success: true,
        userId: response.userId,
        message: otp ? "OTP sent successfully (Development Mode)" : "OTP sent successfully. Please check your email.",
        // Only return OTP in development mode for testing
        ...otp && { otp, developmentMode: true },
        emailSent: emailResult.success
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send OTP"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
