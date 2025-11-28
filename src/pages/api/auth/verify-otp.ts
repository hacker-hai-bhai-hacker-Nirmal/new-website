// src/pages/api/auth/verify-otp.ts
// Enhanced OTP verification with RBAC integration and JWT tokens

import { AppwriteService } from '../../../lib/appwriteService.js';
import { sessionManager } from '../../../lib/sessionManager.js';

interface VerifyOTPRequest {
  email: string;
  otp: string;
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
    const { email, otp, userId } = body;
    
    if ((!email && !userId) || !otp) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email (or userId) and OTP are required' 
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

    // Verify OTP
    const isValidOTP = await appwrite.verifyOTP(user.userId, otp);
    
    if (!isValidOTP) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid or expired OTP' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
      updatedAt: new Date(),
      verificationToken: undefined,
      verificationTokenExpiry: undefined
    });

    // Get client IP and user agent for session
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Create session with JWT tokens
    const sessionData = await sessionManager.createSession(
      user.userId,
      ipAddress,
      userAgent
    );

    const response: VerifyOTPResponse = {
      success: true,
      accessToken: sessionData.accessToken,
      refreshToken: sessionData.refreshToken,
      expiresIn: sessionData.expiresIn,
      user: {
        userId: sessionData.user.userId,
        email: sessionData.user.email,
        firstName: sessionData.user.firstName || user.firstName,
        lastName: sessionData.user.lastName || user.lastName,
        role: sessionData.user.role,
        permissions: sessionData.user.permissions
      },
      message: 'OTP verified successfully'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `accessToken=${sessionData.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${sessionData.expiresIn}`
        }
      }
    );

  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'OTP verification failed' 
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
