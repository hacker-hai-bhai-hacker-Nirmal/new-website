// Enhanced OTP Verification API Endpoint with Role-Based Authentication
// POST /api/auth/verify-otp
// Verifies OTP and returns JWT tokens with role information

import { authService } from '../../../lib/authService.js';

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    // Get the runtime environment for JWT secret
    const runtimeEnv = locals?.runtime?.env;
    
    // Create auth service with environment variables
    const auth = new authService.constructor(runtimeEnv);

    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.otp || !body.otpToken) {
      return Response.json({
        success: false,
        error: 'Missing required fields: email, otp, otpToken'
      }, { status: 400 });
    }

    // Verify OTP and get tokens
    const result = await auth.verifyOTP(body.email, body.otp, body.otpToken);

    if (result.success) {
      return Response.json({
        success: true,
        message: result.message,
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('OTP verification error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "OTP verification endpoint - POST to verify OTP and get JWT tokens",
    requiredFields: ['email', 'otp', 'otpToken'],
    returns: ['user', 'accessToken', 'refreshToken', 'expiresIn']
  });
}
