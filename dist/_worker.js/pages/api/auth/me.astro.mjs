globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AuthService, R as ROLE_PERMISSIONS } from '../../../chunks/authService_1REzO2KN.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET({ request, locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const auth = new AuthService(runtimeEnv);
    let token = null;
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    if (!token) {
      const cookies = request.headers.get("Cookie") || "";
      const accessTokenMatch = cookies.match(/access_token=([^;]+)/);
      if (accessTokenMatch) {
        token = accessTokenMatch[1];
      }
    }
    if (!token) {
      return Response.json({
        success: false,
        error: "No authentication token provided"
      }, { status: 401 });
    }
    const user = await auth.getUserFromToken(token);
    if (!user) {
      return Response.json({
        success: false,
        error: "Invalid or expired token"
      }, { status: 401 });
    }
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        restaurantId: user.restaurantId,
        phone: user.phone,
        isActive: user.isActive,
        permissions,
        createdAt: new Date(user.createdAt).toISOString(),
        lastLoginAt: (/* @__PURE__ */ new Date()).toISOString()
        // In production, track actual last login
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    return Response.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
}
async function POST({ request, locals }) {
  return Response.json({
    success: false,
    error: "Profile update not implemented yet"
  }, { status: 501 });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
