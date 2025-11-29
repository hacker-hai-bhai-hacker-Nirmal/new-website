globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AuthService } from '../../../chunks/authService_1REzO2KN.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const auth = new AuthService(runtimeEnv);
    const body = await request.json();
    if (!body.email || !body.firstName || !body.lastName || !body.role) {
      return Response.json({
        success: false,
        error: "Missing required fields: email, firstName, lastName, role"
      }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return Response.json({
        success: false,
        error: "Invalid email format"
      }, { status: 400 });
    }
    const validRoles = ["customer", "delivery_partner", "restaurant_staff"];
    if (!validRoles.includes(body.role)) {
      return Response.json({
        success: false,
        error: "Invalid role. Must be one of: customer, delivery_partner, restaurant_staff"
      }, { status: 400 });
    }
    if (body.role === "restaurant_staff" && !body.restaurantId) {
      return Response.json({
        success: false,
        error: "Restaurant ID is required for restaurant staff role"
      }, { status: 400 });
    }
    const result = await auth.register(body);
    if (result.success) {
      console.log(`OTP for ${body.email}: ${result.otp}`);
      return Response.json({
        success: true,
        message: result.message,
        otpToken: result.otpToken,
        user: {
          id: result.user?.id,
          email: result.user?.email,
          firstName: result.user?.firstName,
          lastName: result.user?.lastName,
          role: result.user?.role,
          restaurantId: result.user?.restaurantId
        }
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
}
async function GET() {
  return Response.json({
    success: true,
    message: "Registration endpoint - POST to register with role-based authentication",
    supportedRoles: ["customer", "delivery_partner", "restaurant_staff"],
    requiredFields: ["email", "firstName", "lastName", "role"],
    optionalFields: ["phone", "restaurantId"]
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
