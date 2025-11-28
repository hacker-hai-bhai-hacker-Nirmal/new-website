globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const MCP_API_KEY = "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";
    const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
    const { email } = await request.json();
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const testOtp = Math.floor(1e5 + Math.random() * 9e5).toString();
    const emailData = {
      sender: {
        name: "Litterateur - Direct MCP Test",
        email: "nirmalbajiya@gmail.com"
      },
      to: [
        {
          email,
          name: "Nirmal"
        }
      ],
      subject: "🧪 Direct MCP Test - OTP: " + testOtp,
      htmlContent: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71; text-align: center;">🌿 Litterateur</h2>
            <h3>🧪 Direct MCP API Test</h3>
            <p><strong>Your test verification code is:</strong></p>
            <div style="background: #f8f9fa; border: 2px solid #2ecc71; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <span style="font-size: 32px; font-weight: bold; color: #2ecc71;">${testOtp}</span>
            </div>
            <p><strong>This was sent using the direct MCP API key.</strong></p>
            <p>If you receive this, the MCP integration is working perfectly!</p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              The Litterateur Team
            </p>
          </div>
        </div>
      `
    };
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MCP_API_KEY
      },
      body: JSON.stringify(emailData)
    });
    const result = await response.json();
    return new Response(
      JSON.stringify({
        success: response.ok,
        message: response.ok ? "Direct MCP API test successful" : "Direct MCP API test failed",
        otp: testOtp,
        messageId: result.messageId,
        response: result,
        status: response.status,
        note: "This uses the direct MCP key that we know works"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Direct MCP test error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Direct MCP API test failed"
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
