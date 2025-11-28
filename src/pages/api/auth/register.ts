// User Registration API Endpoint
// POST /api/auth/register
// Registers new users with role-based access control

import { AppwriteService } from '../../../lib/appwriteService.js';
import { sessionManager } from '../../../lib/sessionManager.js';

interface RegisterRequest {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'delivery_partner' | 'restaurant_staff';
  restaurantId?: string; // Required for restaurant_staff role
}

interface RegisterResponse {
  success: boolean;
  userId?: string;
  email?: string;
  otpSent?: boolean;
  expiresIn?: number;
  error?: string;
  message?: string;
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    const body: RegisterRequest = await request.json();
    
    // Validate required fields
    const { email, firstName, lastName, role } = body;
    
    if (!email || !firstName || !lastName || !role) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: email, firstName, lastName, role' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate role
    const allowedRoles = ['customer', 'delivery_partner', 'restaurant_staff'];
    if (!allowedRoles.includes(role)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid role. Allowed roles: customer, delivery_partner, restaurant_staff' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if restaurantId is required and provided
    if (role === 'restaurant_staff' && !body.restaurantId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'restaurantId is required for restaurant_staff role' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const appwrite = new AppwriteService();

    // Check if user already exists
    const existingUser = await appwrite.getUserByEmail(email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User with this email already exists' 
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get role information
    const roleInfo = await appwrite.getRoleByName(role);
    if (!roleInfo) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Role not found' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate verification token and OTP
    const verificationToken = generateVerificationToken();
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user record
    const userId = await appwrite.createUser({
      email,
      phone: body.phone || undefined,
      firstName,
      lastName,
      status: 'pending_verification',
      roleId: roleInfo.roleId,
      restaurantId: body.restaurantId || undefined,
      verificationToken,
      verificationTokenExpiry: otpExpiry,
      twoFactorEnabled: false,
      preferences: {
        language: 'en',
        notificationsEnabled: true,
        theme: 'light'
      }
    });

    // Store OTP for verification (could be in Redis or database)
    await appwrite.storeOTP(userId, otp, otpExpiry);

    // Send OTP email via Cloudflare Worker
    try {
      const emailResponse = await fetch('https://litterateur-otp-worker.nirmalkb21.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          otp,
          purpose: 'registration',
          firstName,
          lastName
        })
      });

      if (!emailResponse.ok) {
        console.error('Failed to send OTP email:', await emailResponse.text());
        // Continue anyway - user can request OTP resend
      }
    } catch (error) {
      console.error('Error sending OTP email:', error);
      // Continue anyway - user can request OTP resend
    }

    const response: RegisterResponse = {
      success: true,
      userId: typeof userId === 'string' ? userId : userId.toString(),
      email,
      otpSent: true,
      expiresIn: 600, // 10 minutes in seconds
      message: 'Registration successful. Please check your email for verification code.'
    };

    return new Response(
      JSON.stringify(response),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Registration failed. Please try again.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Helper functions
function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
