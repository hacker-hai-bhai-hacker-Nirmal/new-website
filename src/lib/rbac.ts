// Role-Based Access Control (RBAC) Utility
// Provides helper functions for role-based permissions and access control

import { User, ROLE_PERMISSIONS } from './authService.js';

export type Role = 'customer' | 'delivery_partner' | 'restaurant_staff' | 'admin';

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface RolePermissions {
  [key: string]: Permission[];
}

// Define detailed permissions for each role
export const DETAILED_ROLE_PERMISSIONS: RolePermissions = {
  customer: [
    {
      resource: 'profile',
      actions: ['read', 'update']
    },
    {
      resource: 'orders',
      actions: ['create', 'read', 'update']
    },
    {
      resource: 'rewards',
      actions: ['read']
    },
    {
      resource: 'menu',
      actions: ['read']
    }
  ],
  delivery_partner: [
    {
      resource: 'profile',
      actions: ['read', 'update']
    },
    {
      resource: 'delivery',
      actions: ['read', 'update']
    },
    {
      resource: 'orders',
      actions: ['read']
    },
    {
      resource: 'kitchen',
      actions: ['read']
    }
  ],
  restaurant_staff: [
    {
      resource: 'profile',
      actions: ['read', 'update']
    },
    {
      resource: 'kitchen',
      actions: ['read', 'update']
    },
    {
      resource: 'menu',
      actions: ['read', 'update']
    },
    {
      resource: 'orders',
      actions: ['read', 'update']
    }
  ],
  admin: [
    {
      resource: 'profile',
      actions: ['read', 'update']
    },
    {
      resource: 'users',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      resource: 'restaurants',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      resource: 'menu',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      resource: 'orders',
      actions: ['read', 'update', 'delete']
    },
    {
      resource: 'delivery',
      actions: ['read', 'update', 'delete']
    },
    {
      resource: 'kitchen',
      actions: ['read', 'update', 'delete']
    },
    {
      resource: 'analytics',
      actions: ['read']
    },
    {
      resource: 'settings',
      actions: ['read', 'update']
    }
  ]
};

export class RBACService {
  /**
   * Check if user has permission for specific action on resource
   */
  static hasPermission(user: User, resource: string, action: string): boolean {
    if (!user || !user.isActive) {
      return false;
    }

    const rolePermissions = DETAILED_ROLE_PERMISSIONS[user.role] || [];
    const resourcePermission = rolePermissions.find(p => p.resource === resource);
    
    return resourcePermission ? resourcePermission.actions.includes(action as any) : false;
  }

  /**
   * Check if user can access route
   */
  static canAccessRoute(user: User, pathname: string): boolean {
    if (!user || !user.isActive) {
      return false;
    }

    // Use the existing route permissions from auth service
    const allowedRoutes = ROLE_PERMISSIONS[user.role] || [];
    return allowedRoutes.some(route => pathname.startsWith(route));
  }

  /**
   * Get all permissions for a role
   */
  static getRolePermissions(role: Role): Permission[] {
    return DETAILED_ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Get user's permissions
   */
  static getUserPermissions(user: User): Permission[] {
    return this.getRolePermissions(user.role as Role);
  }

  /**
   * Check if user has any of the specified roles
   */
  static hasAnyRole(user: User, roles: Role[]): boolean {
    return roles.includes(user.role as Role);
  }

  /**
   * Check if user has all of the specified roles (useful for admin checks)
   */
  static hasAllRoles(user: User, roles: Role[]): boolean {
    return roles.every(role => user.role === role);
  }

  /**
   * Get role hierarchy level (higher number = more privileges)
   */
  static getRoleLevel(role: Role): number {
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
  static hasMinimumRole(user: User, minimumRole: Role): boolean {
    const userLevel = this.getRoleLevel(user.role as Role);
    const requiredLevel = this.getRoleLevel(minimumRole);
    return userLevel >= requiredLevel;
  }

  /**
   * Filter data based on user's role permissions
   */
  static filterDataByRole<T extends { [key: string]: any }>(
    user: User, 
    data: T[], 
    getOwnershipField?: (item: T) => string
  ): T[] {
    if (!user || !data) return [];

    // Admin can see all data
    if (user.role === 'admin') {
      return data;
    }

    // For other roles, filter based on ownership or role-specific rules
    if (getOwnershipField && user.role !== 'admin') {
      return data.filter(item => getOwnershipField(item) === user.id);
    }

    // Default: return data based on role-specific business logic
    switch (user.role) {
      case 'customer':
        // Customers can only see their own orders, profile, etc.
        return data.filter(item => {
          const ownershipField = getOwnershipField?.(item);
          return ownershipField === user.id;
        });
      
      case 'delivery_partner':
        // Delivery partners can see assigned orders
        return data.filter(item => {
          // Check if order is assigned to this delivery partner
          return item.assignedDeliveryPartnerId === user.id;
        });
      
      case 'restaurant_staff':
        // Restaurant staff can see orders for their restaurant
        return data.filter(item => {
          return item.restaurantId === user.restaurantId;
        });
      
      default:
        return [];
    }
  }

  /**
   * Create middleware for checking specific permissions
   */
  static requirePermission(resource: string, action: string) {
    return (user: User): boolean => {
      return this.hasPermission(user, resource, action);
    };
  }

  /**
   * Create middleware for requiring minimum role level
   */
  static requireMinimumRole(minimumRole: Role) {
    return (user: User): boolean => {
      return this.hasMinimumRole(user, minimumRole);
    };
  }
}

// Export convenience functions
export const hasPermission = RBACService.hasPermission;
export const canAccessRoute = RBACService.canAccessRoute;
export const getRolePermissions = RBACService.getRolePermissions;
export const getUserPermissions = RBACService.getUserPermissions;
export const hasAnyRole = RBACService.hasAnyRole;
export const hasMinimumRole = RBACService.hasMinimumRole;
