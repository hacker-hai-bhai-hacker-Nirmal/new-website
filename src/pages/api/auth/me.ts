// Enhanced Get Current User API Endpoint with Role-Based Information
// GET /api/auth/me
// Returns information about the currently authenticated user with role data

import { AuthService, ROLE_PERMISSIONS } from '../../../lib/authService.js';

export async function GET({ request, locals }: { request: Request; locals: any }) {
  try {
    // Get the runtime environment for JWT secret
    const runtimeEnv = locals?.runtime?.env;
    
    // Create auth service with environment variables
    const auth = new AuthService(runtimeEnv);

    // Extract token from Authorization header or cookies
    let token = null;
    
    // Check Authorization header
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // Check cookies as fallback
    if (!token) {
      const cookies = request.headers.get('Cookie') || '';
      const accessTokenMatch = cookies.match(/access_token=([^;]+)/);
      if (accessTokenMatch) {
        token = accessTokenMatch[1];
      }
    }

    if (!token) {
      return Response.json({
        success: false,
        error: 'No authentication token provided'
      }, { status: 401 });
    }

    // Get user from token
    const user = await auth.getUserFromToken(token);
    
    if (!user) {
      return Response.json({
        success: false,
        error: 'Invalid or expired token'
      }, { status: 401 });
    }

    // Get user permissions based on role
    const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];

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
        permissions: permissions,
        createdAt: new Date(user.createdAt).toISOString(),
        lastLoginAt: new Date().toISOString() // In production, track actual last login
      }
    });

  } catch (error: any) {
    console.error('Get user error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST({ request, locals }: { request: Request; locals: any }) {
  // POST endpoint for updating user profile (future implementation)
  return Response.json({
    success: false,
    error: 'Profile update not implemented yet'
  }, { status: 501 });
}
