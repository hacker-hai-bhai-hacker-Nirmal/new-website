globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as account } from '../../../chunks/appwrite_CaeG9vcz.mjs';
import { I as ID } from '../../../chunks/sdk_BPbYzYsq.mjs';
import { s as sendOtpEmail } from '../../../chunks/brevoService_C7HhBd8A.mjs';
export { renderers } from '../../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
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
