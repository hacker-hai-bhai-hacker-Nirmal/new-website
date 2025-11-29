globalThis.process ??= {}; globalThis.process.env ??= {};
import { R as ROLE_PERMISSIONS, A as AuthService } from '../../chunks/authService_1REzO2KN.mjs';
export { renderers } from '../../renderers.mjs';

const DETAILED_ROLE_PERMISSIONS = {
  customer: [
    {
      resource: "profile",
      actions: ["read", "update"]
    },
    {
      resource: "orders",
      actions: ["create", "read", "update"]
    },
    {
      resource: "rewards",
      actions: ["read"]
    },
    {
      resource: "menu",
      actions: ["read"]
    }
  ],
  delivery_partner: [
    {
      resource: "profile",
      actions: ["read", "update"]
    },
    {
      resource: "delivery",
      actions: ["read", "update"]
    },
    {
      resource: "orders",
      actions: ["read"]
    },
    {
      resource: "kitchen",
      actions: ["read"]
    }
  ],
  restaurant_staff: [
    {
      resource: "profile",
      actions: ["read", "update"]
    },
    {
      resource: "kitchen",
      actions: ["read", "update"]
    },
    {
      resource: "menu",
      actions: ["read", "update"]
    },
    {
      resource: "orders",
      actions: ["read", "update"]
    }
  ],
  admin: [
    {
      resource: "profile",
      actions: ["read", "update"]
    },
    {
      resource: "users",
      actions: ["create", "read", "update", "delete"]
    },
    {
      resource: "restaurants",
      actions: ["create", "read", "update", "delete"]
    },
    {
      resource: "menu",
      actions: ["create", "read", "update", "delete"]
    },
    {
      resource: "orders",
      actions: ["read", "update", "delete"]
    },
    {
      resource: "delivery",
      actions: ["read", "update", "delete"]
    },
    {
      resource: "kitchen",
      actions: ["read", "update", "delete"]
    },
    {
      resource: "analytics",
      actions: ["read"]
    },
    {
      resource: "settings",
      actions: ["read", "update"]
    }
  ]
};
class RBACService {
  /**
   * Check if user has permission for specific action on resource
   */
  static hasPermission(user, resource, action) {
    if (!user || !user.isActive) {
      return false;
    }
    const rolePermissions = DETAILED_ROLE_PERMISSIONS[user.role] || [];
    const resourcePermission = rolePermissions.find((p) => p.resource === resource);
    return resourcePermission ? resourcePermission.actions.includes(action) : false;
  }
  /**
   * Check if user can access route
   */
  static canAccessRoute(user, pathname) {
    if (!user || !user.isActive) {
      return false;
    }
    const allowedRoutes = ROLE_PERMISSIONS[user.role] || [];
    return allowedRoutes.some((route) => pathname.startsWith(route));
  }
  /**
   * Get all permissions for a role
   */
  static getRolePermissions(role) {
    return DETAILED_ROLE_PERMISSIONS[role] || [];
  }
  /**
   * Get user's permissions
   */
  static getUserPermissions(user) {
    return this.getRolePermissions(user.role);
  }
  /**
   * Check if user has any of the specified roles
   */
  static hasAnyRole(user, roles) {
    return roles.includes(user.role);
  }
  /**
   * Check if user has all of the specified roles (useful for admin checks)
   */
  static hasAllRoles(user, roles) {
    return roles.every((role) => user.role === role);
  }
  /**
   * Get role hierarchy level (higher number = more privileges)
   */
  static getRoleLevel(role) {
    const hierarchy = {
      customer: 1,
      delivery_partner: 2,
      restaurant_staff: 3,
      admin: 4
    };
    return hierarchy[role] || 0;
  }
  /**
   * Check if user's role is equal to or higher than required role
   */
  static hasMinimumRole(user, minimumRole) {
    const userLevel = this.getRoleLevel(user.role);
    const requiredLevel = this.getRoleLevel(minimumRole);
    return userLevel >= requiredLevel;
  }
  /**
   * Filter data based on user's role permissions
   */
  static filterDataByRole(user, data, getOwnershipField) {
    if (!user || !data) return [];
    if (user.role === "admin") {
      return data;
    }
    if (getOwnershipField && user.role !== "admin") {
      return data.filter((item) => getOwnershipField(item) === user.id);
    }
    switch (user.role) {
      case "customer":
        return data.filter((item) => {
          const ownershipField = getOwnershipField?.(item);
          return ownershipField === user.id;
        });
      case "delivery_partner":
        return data.filter((item) => {
          return item.assignedDeliveryPartnerId === user.id;
        });
      case "restaurant_staff":
        return data.filter((item) => {
          return item.restaurantId === user.restaurantId;
        });
      default:
        return [];
    }
  }
  /**
   * Create middleware for checking specific permissions
   */
  static requirePermission(resource, action) {
    return (user) => {
      return this.hasPermission(user, resource, action);
    };
  }
  /**
   * Create middleware for requiring minimum role level
   */
  static requireMinimumRole(minimumRole) {
    return (user) => {
      return this.hasMinimumRole(user, minimumRole);
    };
  }
}
RBACService.hasPermission;
RBACService.canAccessRoute;
RBACService.getRolePermissions;
RBACService.getUserPermissions;
RBACService.hasAnyRole;
RBACService.hasMinimumRole;

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
