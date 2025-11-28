globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as sendOtpEmail } from '../../chunks/brevoService_C7HhBd8A.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const testOtp = "123456";
    const result = await sendOtpEmail("nirmalbajiya@gmail.com", testOtp, "Nirmal");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Brevo API test completed",
        result
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Brevo test error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Brevo API test failed"
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
