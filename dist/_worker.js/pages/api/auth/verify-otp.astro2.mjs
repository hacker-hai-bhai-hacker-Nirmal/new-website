globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as account } from '../../../chunks/appwrite_BQwyboXP.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { userId, otp } = await request.json();
    if (!userId || !otp) {
      return new Response(
        JSON.stringify({ success: false, error: "User ID and OTP are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const session = await account.createSession(
      userId,
      otp
    );
    const user = await account.get();
    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.$id,
        userId: session.userId,
        user,
        message: "OTP verified successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Invalid or expired OTP"
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
