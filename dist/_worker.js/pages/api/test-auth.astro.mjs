globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AuthService, R as ROLE_PERMISSIONS } from '../../chunks/authService_1REzO2KN.mjs';
import { R as RBACService } from '../../chunks/rbac_D7LocId2.mjs';
export { renderers } from '../../renderers.mjs';

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
        message: "No token provided",
        test: "authentication",
        status: "unauthenticated"
      });
    }
    const user = await auth.getUserFromToken(token);
    if (!user) {
      return Response.json({
        success: false,
        message: "Invalid token",
        test: "authentication",
        status: "invalid_token"
      });
    }
    const permissions = RBACService.getUserPermissions(user);
    const canAccessDashboard = RBACService.canAccessRoute(user, "/dashboard");
    const canAccessAdmin = RBACService.canAccessRoute(user, "/admin");
    const canAccessKitchen = RBACService.canAccessRoute(user, "/kitchen");
    return Response.json({
      success: true,
      message: "Authentication test successful",
      test: "authentication",
      status: "authenticated",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        restaurantId: user.restaurantId,
        isActive: user.isActive
      },
      permissions: {
        count: permissions.length,
        list: permissions.map((p) => ({
          resource: p.resource,
          actions: p.actions
        }))
      },
      routeAccess: {
        dashboard: canAccessDashboard,
        admin: canAccessAdmin,
        kitchen: canAccessKitchen,
        availableRoutes: ROLE_PERMISSIONS[user.role] || []
      },
      rbacTests: {
        canManageUsers: RBACService.hasPermission(user, "users", "create"),
        canManageMenu: RBACService.hasPermission(user, "menu", "update"),
        canReadOrders: RBACService.hasPermission(user, "orders", "read"),
        roleLevel: RBACService.getRoleLevel(user.role),
        hasAdminRole: RBACService.hasAnyRole(user, ["admin"])
      },
      environment: {
        jwtSecretSet: !!runtimeEnv?.JWT_SECRET,
        serviceWorking: true
      }
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return Response.json({
      success: false,
      message: "Test failed",
      error: error.message,
      test: "authentication",
      status: "error"
    }, { status: 500 });
  }
}
async function POST({ request, locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const auth = new AuthService(runtimeEnv);
    const body = await request.json();
    if (body.action === "register") {
      const result = await auth.register({
        email: body.email || "test@example.com",
        firstName: body.firstName || "Test",
        lastName: body.lastName || "User",
        role: body.role || "customer",
        phone: body.phone,
        restaurantId: body.restaurantId
      });
      return Response.json({
        success: true,
        action: "register",
        result: {
          success: result.success,
          message: result.message,
          otpToken: result.otpToken,
          otp: result.otp,
          user: result.user ? {
            id: result.user.id,
            email: result.user.email,
            role: result.user.role
          } : null
        }
      });
    }
    if (body.action === "verify-otp") {
      if (!body.otpToken || !body.otp) {
        return Response.json({
          success: false,
          error: "Missing otpToken or otp"
        });
      }
      const result = await auth.verifyOTP("test@example.com", body.otp, body.otpToken);
      return Response.json({
        success: true,
        action: "verify-otp",
        result: {
          success: result.success,
          message: result.message,
          user: result.user,
          hasAccessToken: !!result.accessToken,
          hasRefreshToken: !!result.refreshToken,
          expiresIn: result.expiresIn
        }
      });
    }
    return Response.json({
      success: false,
      error: 'Unknown action. Use "register" or "verify-otp"'
    });
  } catch (error) {
    console.error("Auth test POST error:", error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
