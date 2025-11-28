// src/pages/api/auth/verify-otp.ts
// Enhanced OTP verification with JWT-based stateless verification
// No database required - uses JWT token containing encrypted OTP

import { AppwriteService } from '../../../lib/appwriteService.js';
import { sessionManager } from '../../../lib/sessionManager.js';
import { otpService } from '../../../lib/otpService.js';

interface VerifyOTPRequest {
  email: string;
  otp: string;
  otpToken: string; // JWT containing encrypted OTP
  userId?: string; // For backward compatibility
}

interface VerifyOTPResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string[];
  };
  error?: string;
  message?: string;
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    const body: VerifyOTPRequest = await request.json();
    
    // Support both email-based and userId-based verification
    const { email, otp, otpToken, userId } = body;
    
    if ((!email && !userId) || !otp || !otpToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email (or userId), OTP, and OTP token are required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // First verify the OTP using JWT token (no database needed)
    const otpVerification = await otpService.verifyOTP({
      email: email || '', // Will be validated in JWT token
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

    const appwrite = new AppwriteService();
    let user;

    // Find user by email or userId
    if (email) {
      user = await appwrite.getUserByEmail(email);
    } else if (userId) {
      user = await appwrite.getUser(userId);
    }

    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User not found' 
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get user role and permissions
    const role = await appwrite.getRole(user.roleId);
    if (!role) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User role not found' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update user status to active
    await appwrite.updateUser(user.userId, {
      status: 'active',
      updatedAt: new Date()
    });

    // Create session tokens
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const sessionResult = await sessionManager.createSession(
      user.userId,
      clientIP,
      userAgent
    );

    if (!sessionResult.accessToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to create session' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log successful verification (using console.log if logAuditEvent doesn't exist)
    try {
      // Try to use audit logging if available
      if (typeof (appwrite as any).logAuditEvent === 'function') {
        await (appwrite as any).logAuditEvent({
          userId: user.userId,
          action: 'OTP_VERIFICATION_SUCCESS',
          resource: 'auth',
          details: {
            email: user.email,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        // Fallback to console logging
        console.log('OTP verification successful:', {
          userId: user.userId,
          email: user.email,
          timestamp: new Date().toISOString()
        });
      }
    } catch (logError) {
      console.warn('Failed to log audit event:', logError);
      // Continue even if logging fails
    }

    // Return success response with tokens
    return new Response(
      JSON.stringify({
        success: true,
        accessToken: sessionResult.accessToken,
        refreshToken: sessionResult.refreshToken,
        expiresIn: sessionResult.expiresIn,
        user: {
          userId: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: role.roleName,
          permissions: role.permissions
        },
        message: 'OTP verified successfully! You are now logged in.'
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