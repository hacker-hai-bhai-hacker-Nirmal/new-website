// Enhanced Refresh Token API Endpoint with Role-Based Authentication
// POST /api/auth/refresh
// Refreshes access tokens using refresh tokens

import { AuthService } from '../../../lib/authService.js';

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    // Get the runtime environment for JWT secret
    const runtimeEnv = locals?.runtime?.env;
    
    // Create auth service with environment variables
    const auth = new AuthService(runtimeEnv);

    const body = await request.json();

    // Validate required fields
    if (!body.refreshToken) {
      return Response.json({
        success: false,
        error: 'Missing required field: refreshToken'
      }, { status: 400 });
    }

    // Refresh token
    const result = await auth.refreshToken(body.refreshToken);

    if (result.success) {
      return Response.json({
        success: true,
        message: result.message,
        accessToken: result.accessToken,
        expiresIn: result.expiresIn
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 401 });
    }

  } catch (error: any) {
    console.error('Token refresh error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "Token refresh endpoint - POST to refresh access tokens",
    requiredFields: ['refreshToken'],
    returns: ['accessToken', 'expiresIn']
  });
}
