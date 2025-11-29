// Authentication API Documentation and Status Endpoint
// GET /api/auth
// Provides comprehensive documentation for the authentication system
// Updated: 2025-11-30 - Testing deployment

import { authService, ROLE_PERMISSIONS } from '../../../lib/authService.js';
import { DETAILED_ROLE_PERMISSIONS } from '../../../lib/rbac.js';

export async function GET() {
  return Response.json({
    success: true,
    title: "Role-Based Authentication API",
    version: "1.0.0",
    description: "Complete authentication system with role-based access control",
    
    endpoints: {
      "POST /api/auth/register": {
        description: "Register new user with role",
        requiredFields: ["email", "firstName", "lastName", "role"],
        optionalFields: ["phone", "restaurantId"],
        supportedRoles: ["customer", "delivery_partner", "restaurant_staff"],
        returns: ["user", "otpToken", "message"]
      },
      
      "POST /api/auth/verify-otp": {
        description: "Verify OTP and get JWT tokens",
        requiredFields: ["email", "otp", "otpToken"],
        returns: ["user", "accessToken", "refreshToken", "expiresIn"]
      },
      
      "POST /api/auth/refresh": {
        description: "Refresh access token",
        requiredFields: ["refreshToken"],
        returns: ["accessToken", "expiresIn"]
      },
      
      "GET /api/auth/me": {
        description: "Get current user information",
        requiresAuth: true,
        returns: ["user", "permissions"]
      },
      
      "POST /api/auth/logout": {
        description: "Logout user",
        requiresAuth: true,
        returns: ["message"]
      }
    },

    roles: {
      customer: {
        description: "Regular customers who can place orders",
        permissions: ROLE_PERMISSIONS.customer,
        detailedPermissions: DETAILED_ROLE_PERMISSIONS.customer
      },
      
      delivery_partner: {
        description: "Delivery partners who handle order deliveries",
        permissions: ROLE_PERMISSIONS.delivery_partner,
        detailedPermissions: DETAILED_ROLE_PERMISSIONS.delivery_partner
      },
      
      restaurant_staff: {
        description: "Restaurant staff who manage kitchen and orders",
        permissions: ROLE_PERMISSIONS.restaurant_staff,
        detailedPermissions: DETAILED_ROLE_PERMISSIONS.restaurant_staff,
        requiresRestaurantId: true
      },
      
      admin: {
        description: "System administrators with full access",
        permissions: ROLE_PERMISSIONS.admin,
        detailedPermissions: DETAILED_ROLE_PERMISSIONS.admin
      }
    },

    protectedRoutes: {
      description: "Routes that require authentication",
      routes: [
        "/dashboard",
        "/checkout", 
        "/rewards",
        "/admin",
        "/kitchen",
        "/delivery",
        "/menu",
        "/orders",
        "/users",
        "/settings",
        "/profile"
      ]
    },

    authentication: {
      methods: ["JWT Bearer Token", "Cookie (access_token)"],
      tokenExpiry: "24 hours",
      refreshTokenExpiry: "7 days",
      otpExpiry: "10 minutes"
    },

    security: {
      features: [
        "JWT-based authentication",
        "Role-based access control (RBAC)",
        "OTP verification for registration/login",
        "Token refresh mechanism",
        "Route protection middleware",
        "Permission-based API access"
      ]
    },

    examples: {
      register: {
        method: "POST",
        url: "/api/auth/register",
        body: {
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "customer",
          phone: "+1234567890"
        }
      },
      
      verifyOTP: {
        method: "POST",
        url: "/api/auth/verify-otp",
        body: {
          email: "user@example.com",
          otp: "123456",
          otpToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      },
      
      authenticatedRequest: {
        method: "GET",
        url: "/api/auth/me",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    },

    errorCodes: {
      400: "Bad Request - Missing or invalid fields",
      401: "Unauthorized - Invalid or missing token",
      403: "Forbidden - Insufficient permissions",
      500: "Internal Server Error"
    },

    nextSteps: [
      "Integrate with email service for OTP delivery",
      "Add rate limiting for OTP requests",
      "Implement user profile management",
      "Add audit logging for security events",
      "Create role management interface for admins"
    ]
  });
}
