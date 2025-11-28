globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, otp } = body;
    console.log("Debug OTP verification:", { email, otp });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Debug endpoint reached",
        received: { email, otp }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Debug OTP error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function GET() {
  return new Response(
    JSON.stringify({
      message: "OTP Debug Endpoint - POST with email and otp to test",
      example: { email: "test@example.com", otp: "123456" }
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
