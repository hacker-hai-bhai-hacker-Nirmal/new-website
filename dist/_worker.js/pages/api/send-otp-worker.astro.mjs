globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const POST = async (request) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    let brevoApiKey = null;
    if (Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key) {
      brevoApiKey = Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key;
      console.log("✅ Found brevo_MCP_key via import.meta.env");
    }
    if (!brevoApiKey && process.env?.brevo_MCP_key) {
      brevoApiKey = process.env.brevo_MCP_key;
      console.log("✅ Found brevo_MCP_key via process.env");
    }
    if (!brevoApiKey && globalThis?.env?.brevo_MCP_key) {
      brevoApiKey = globalThis.env.brevo_MCP_key;
      console.log("✅ Found brevo_MCP_key via globalThis.env");
    }
    if (!brevoApiKey) {
      console.error("❌ brevo_MCP_key not found in any environment");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service configuration error - brevo_MCP_key not found in any environment context",
          debug: {
            importMetaEnv: !!Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key,
            processEnv: !!process.env?.brevo_MCP_key,
            globalThisEnv: !!globalThis?.env?.brevo_MCP_key
          }
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("✅ brevo_MCP_key found, length:", brevoApiKey.length);
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    const emailData = {
      sender: {
        name: "Litterateur",
        email: "nirmalbajiya@gmail.com"
      },
      to: [
        {
          email,
          name: "User"
        }
      ],
      subject: "🌿 Litterateur OTP - Your Verification Code",
      htmlContent: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71; text-align: center;">🌿 Litterateur</h2>
            <h3>Your Verification Code</h3>
            <p><strong>Your one-time password is:</strong></p>
            <div style="background: #f8f9fa; border: 2px solid #2ecc71; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <span style="font-size: 32px; font-weight: bold; color: #2ecc71;">${otp}</span>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              The Litterateur Team
            </p>
          </div>
        </div>
      `
    };
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey
      },
      body: JSON.stringify(emailData)
    });
    const result = await response.json();
    if (response.ok && result.messageId) {
      console.log("✅ Email sent successfully via Brevo!");
      console.log("📧 Message ID:", result.messageId);
      return new Response(
        JSON.stringify({
          success: true,
          message: "OTP sent successfully!",
          otp,
          // Return for testing
          emailSent: true,
          messageId: result.messageId,
          debug: {
            envMethod: brevoApiKey === Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key ? "import.meta.env" : brevoApiKey === process.env?.brevo_MCP_key ? "process.env" : "globalThis.env"
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      throw new Error(result.message || "Brevo API error");
    }
  } catch (error) {
    console.error("❌ Send OTP error:", error);
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
