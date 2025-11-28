globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AppwriteService } from '../../../chunks/sessionManager_C6n_ySBK.mjs';
import { o as otpService } from '../../../chunks/otpService_C3WRlkYI.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, role } = body;
    if (!email || !firstName || !lastName || !role) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: email, firstName, lastName, role"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const allowedRoles = ["customer", "delivery_partner", "restaurant_staff"];
    if (!allowedRoles.includes(role)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid role. Allowed roles: customer, delivery_partner, restaurant_staff"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (role === "restaurant_staff" && !body.restaurantId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "restaurantId is required for restaurant_staff role"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const appwrite = new AppwriteService();
    const existingUser = await appwrite.getUserByEmail(email);
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User with this email already exists"
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    const roleInfo = await appwrite.getRoleByName(role);
    if (!roleInfo) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Role not found"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const otpResult = await otpService.generateOTP({
      email,
      firstName,
      lastName,
      purpose: "registration"
    });
    if (!otpResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpResult.error || "Failed to generate OTP"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const userId = await appwrite.createUser({
      email,
      phone: body.phone || void 0,
      firstName,
      lastName,
      status: "pending_verification",
      roleId: roleInfo.roleId,
      restaurantId: body.restaurantId || void 0,
      twoFactorEnabled: false,
      preferences: {
        language: "en",
        notificationsEnabled: true,
        theme: "light"
      }
    });
    try {
      const emailResponse = await fetch("https://litterateur-otp-worker.nirmalkb21.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otpResult.otp,
          // Use plain OTP for email
          purpose: "registration",
          firstName,
          lastName
        })
      });
      if (!emailResponse.ok) {
        console.error("Failed to send OTP email:", await emailResponse.text());
      }
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
    }
    return new Response(
      JSON.stringify({
        success: true,
        userId,
        email,
        otpToken: otpResult.otpToken,
        // JWT containing encrypted OTP
        otp: otpResult.otp,
        // Include for development/testing
        expiresIn: otpResult.expiresIn,
        message: `Registration successful! OTP sent to ${email}. Valid for ${10} minutes.`
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Registration failed. Please try again."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function PUT() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function DELETE() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
