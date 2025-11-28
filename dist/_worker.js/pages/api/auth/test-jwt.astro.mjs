globalThis.process ??= {}; globalThis.process.env ??= {};
import { OTPService } from '../../../chunks/otpService_CrrjiutG.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  try {
    console.log("JWT OTP Test Started");
    const otpServiceInstance = new OTPService();
    console.log("OTP Service Created");
    const otpResult = await otpServiceInstance.generateOTP({
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      purpose: "registration"
    });
    console.log("OTP Result:", otpResult);
    if (otpResult.success) {
      console.log("OTP Generated Successfully");
      const verifyResult = await otpServiceInstance.verifyOTP({
        email: "test@example.com",
        otp: otpResult.otp,
        otpToken: otpResult.otpToken
      });
      console.log("Verification Result:", verifyResult);
      return new Response(
        JSON.stringify({
          success: true,
          message: "JWT OTP Test Successful",
          otp: otpResult.otp,
          otpToken: otpResult.otpToken,
          verification: verifyResult
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpResult.error
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("JWT OTP Test Error:", error);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
