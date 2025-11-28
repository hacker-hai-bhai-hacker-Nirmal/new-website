// OTP Verification API Endpoint - JWT Only
// POST /api/auth/verify-otp
// Pure JWT-based OTP verification (no database required)

import { otpService } from '../../../lib/otpService.js';

interface VerifyOTPRequest {
  email: string;
  otp: string;
  otpToken: string; // JWT containing encrypted OTP
  userId?: string; // For backward compatibility
}

interface VerifyOTPResponse {
  success: boolean;
  email?: string;
  message?: string;
  error?: string;
}

export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    const body: VerifyOTPRequest = await request.json();
    
    // Get environment variables from locals (Cloudflare Pages)
    const env = locals?.env || import.meta.env;
    
    // Validate required fields
    const { email, otp, otpToken } = body;
    
    if (!email || !otp || !otpToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email, OTP, and OTP token are required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the OTP using JWT token (no database needed)
    const otpServiceInstance = new otpService(env);
    const otpVerification = await otpServiceInstance.verifyOTP({
      email,
      otp,
      otpToken
    });

    if (!otpVerification.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: otpVerification.error || 'Invalid or expired OTP' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log successful verification
    console.log('OTP verification successful:', {
      email,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        email,
        message: 'OTP verified successfully!'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('OTP verification error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'OTP verification failed. Please try again.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle other HTTP methods
export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function PUT(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function DELETE(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}