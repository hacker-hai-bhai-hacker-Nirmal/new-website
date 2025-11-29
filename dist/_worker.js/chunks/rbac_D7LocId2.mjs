globalThis.process ??= {}; globalThis.process.env ??= {};
import { R as ROLE_PERMISSIONS } from './authService_1REzO2KN.mjs';

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

export { DETAILED_ROLE_PERMISSIONS as D, RBACService as R };
