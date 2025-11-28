// Role-Based Access Control (RBAC) Middleware for Litterateur Restaurant Management System
// Provides middleware functions for protecting API routes based on user roles and permissions

import { defineMiddleware } from 'astro:middleware';
import { sessionManager, type UserSession } from '../lib/sessionManager.js';
import { AppwriteService } from '../lib/appwriteService.js';

// Extend Astro's Locals interface for this module
declare global {
  namespace Astro {
    interface Locals {
      user?: UserSession;
      isAuthenticated?: boolean;
    }
  }
}

export interface AuthContext {
  user: UserSession;
  isAuthenticated: boolean;
}

export type MiddlewareFunction = (context: any, next: () => Promise<Response>) => Promise<Response>;

/**
 * Authentication middleware - validates JWT token and sets user context
 */
export const authMiddleware = defineMiddleware(async (context, next) => {
  const authHeader = context.request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Authorization header required' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const token = authHeader.slice(7);
  
  try {
    const user = await sessionManager.validateAccessToken(token);
    context.locals.user = user;
    context.locals.isAuthenticated = true;
    
    return next();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid or expired token' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Role-based middleware - requires specific role(s)
 */
export function requireRole(...allowedRoles: string[]): MiddlewareFunction {
  return async (context, next) => {
    if (!context.locals.isAuthenticated || !context.locals.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userRole = context.locals.user.role;
    
    if (!allowedRoles.includes(userRole)) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient permissions',
          required: allowedRoles,
          current: userRole
        }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return next();
  };
}

/**
 * Permission-based middleware - requires specific permission(s)
 */
export function requirePermission(...allowedPermissions: string[]): MiddlewareFunction {
  return async (context, next) => {
    if (!context.locals.isAuthenticated || !context.locals.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userPermissions = context.locals.user.permissions;
    
    const hasPermission = allowedPermissions.some(permission => 
      userPermissions.includes(permission)
    );
    
    if (!hasPermission) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient permissions',
          required: allowedPermissions,
          current: userPermissions
        }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return next();
  };
}

/**
 * Self-access middleware - allows users to access their own data
 */
export function requireSelfAccessOrRole(...allowedRoles: string[]): MiddlewareFunction {
  return async (context, next) => {
    if (!context.locals.isAuthenticated || !context.locals.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userRole = context.locals.user.role;
    const userId = context.locals.user.userId;
    
    // Check if accessing own data or has allowed role
    const targetUserId = context.params.userId || context.params.id;
    const isSelfAccess = targetUserId === userId;
    const hasAllowedRole = allowedRoles.includes(userRole);
    
    if (!isSelfAccess && !hasAllowedRole) {
      return new Response(
        JSON.stringify({ 
          error: 'Access denied',
          message: 'You can only access your own data or need elevated permissions'
        }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return next();
  };
}

/**
 * Restaurant access middleware - for restaurant-specific resources
 */
export function requireRestaurantAccess(): MiddlewareFunction {
  return async (context, next) => {
    if (!context.locals.isAuthenticated || !context.locals.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userRole = context.locals.user.role;
    
    // Admin can access any restaurant
    if (userRole === 'admin') {
      return next();
    }

    // Other roles need to be associated with a restaurant
    // This would require additional user data to be loaded
    // For now, we'll allow access to non-admin roles
    const allowedRoles = ['kitchen_staff', 'restaurant_staff', 'delivery_partner'];
    
    if (!allowedRoles.includes(userRole)) {
      return new Response(
        JSON.stringify({ 
          error: 'Restaurant access required',
          allowedRoles
        }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return next();
  };
}

/**
 * Rate limiting middleware (basic implementation)
 */
export function rateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000): MiddlewareFunction {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return async (context, next) => {
    const clientId = context.request.headers.get('x-forwarded-for') || 
                    context.request.headers.get('x-real-ip') || 
                    'unknown';
    
    const now = Date.now();
    const clientRequests = requests.get(clientId);

    if (!clientRequests || now > clientRequests.resetTime) {
      requests.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (clientRequests.count >= maxRequests) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          retryAfter: Math.ceil((clientRequests.resetTime - now) / 1000)
        }), 
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((clientRequests.resetTime - now) / 1000).toString()
          }
        }
      );
    }

    clientRequests.count++;
    return next();
  };
}

/**
 * API key middleware for external integrations
 */
export function requireApiKey(): MiddlewareFunction {
  return async (context, next) => {
    const apiKey = context.request.headers.get('x-api-key');
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return next();
  };
}

/**
 * Combined middleware helpers for common use cases
 */
export const middleware = {
  // Admin only
  adminOnly: [authMiddleware, requireRole('admin')],
  
  // Kitchen staff only
  kitchenOnly: [authMiddleware, requireRole('admin', 'kitchen_staff')],
  
  // Delivery partners only
  deliveryOnly: [authMiddleware, requireRole('admin', 'delivery_partner')],
  
  // Restaurant staff only
  restaurantStaffOnly: [authMiddleware, requireRole('admin', 'restaurant_staff')],
  
  // Customer access
  customerAccess: [authMiddleware, requireRole('admin', 'customer', 'restaurant_staff')],
  
  // User management (admin only)
  userManagement: [authMiddleware, requireRole('admin')],
  
  // Menu management (admin and kitchen staff)
  menuManagement: [authMiddleware, requirePermission('menu.create', 'menu.update', 'menu.delete')],
  
  // Order management (admin, kitchen staff, delivery partners, restaurant staff)
  orderManagement: [authMiddleware, requirePermission('orders.create', 'orders.update')],
  
  // Profile access (self or admin)
  profileAccess: [authMiddleware, requireSelfAccessOrRole('admin')],
  
  // Public with rate limiting
  public: [rateLimit()],
  
  // API endpoints
  apiEndpoint: [authMiddleware, rateLimit(1000, 60 * 1000)], // 1000 requests per minute
  
  // Audit logs (admin only)
  auditLogs: [authMiddleware, requireRole('admin')],
};

/**
 * Helper function to apply middleware to API routes
 */
export function withMiddleware(...middlewareFunctions: MiddlewareFunction[]) {
  return async (context: any) => {
    let index = 0;

    const executeNext = async (): Promise<Response> => {
      if (index >= middlewareFunctions.length) {
        // All middleware passed, execute the route handler
        return context.next();
      }

      const currentMiddleware = middlewareFunctions[index++];
      return currentMiddleware(context, executeNext);
    };

    return executeNext();
  };
}

/**
 * Check if user has specific permission (for use in route handlers)
 */
export function hasPermission(user: UserSession, permission: string): boolean {
  return user.permissions.includes(permission);
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(user: UserSession, ...roles: string[]): boolean {
  return roles.includes(user.role);
}

/**
 * Check if user can access resource based on role hierarchy
 */
export function canAccessResource(user: UserSession, resource: string, action: string): boolean {
  const permission = `${resource}.${action}`;
  return hasPermission(user, permission);
}

/**
 * Helper function to get user-friendly role name
 */
export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    admin: 'Administrator',
    kitchen_staff: 'Kitchen Staff',
    delivery_partner: 'Delivery Partner',
    customer: 'Customer',
    restaurant_staff: 'Restaurant Staff'
  };
  
  return roleNames[role] || role;
}

/**
 * Helper function to get user-friendly permission names
 */
export function getPermissionDisplayNames(permissions: string[]): string[] {
  const permissionNames: Record<string, string> = {
    'users.create': 'Create Users',
    'users.read': 'View Users',
    'users.update': 'Update Users',
    'users.delete': 'Delete Users',
    'menu.create': 'Create Menu Items',
    'menu.read': 'View Menu',
    'menu.update': 'Update Menu Items',
    'menu.delete': 'Delete Menu Items',
    'orders.create': 'Create Orders',
    'orders.read': 'View Orders',
    'orders.update': 'Update Orders',
    'orders.delete': 'Delete Orders',
    'inventory.manage': 'Manage Inventory',
    'reports.view': 'View Reports',
    'audit.view': 'View Audit Logs',
    'kitchen.process': 'Process Kitchen Orders',
    'delivery.manage': 'Manage Deliveries'
  };
  
  return permissions.map(permission => 
    permissionNames[permission] || permission
  );
}
