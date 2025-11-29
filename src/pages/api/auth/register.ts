// Enhanced User Registration API Endpoint with Role-Based Authentication
// POST /api/auth/register
// Supports role-based registration with JWT tokens

import { AuthService, RegisterRequest, RegisterResponse } from '../../../lib/authService.js';

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    // Get the runtime environment for JWT secret
    const runtimeEnv = locals?.runtime?.env;
    
    // Create auth service with environment variables
    const auth = new AuthService(runtimeEnv);

    const body: RegisterRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.role) {
      return Response.json({
        success: false,
        error: 'Missing required fields: email, firstName, lastName, role'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return Response.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate role
    const validRoles = ['customer', 'delivery_partner', 'restaurant_staff'];
    if (!validRoles.includes(body.role)) {
      return Response.json({
        success: false,
        error: 'Invalid role. Must be one of: customer, delivery_partner, restaurant_staff'
      }, { status: 400 });
    }

    // Validate restaurant staff requirements
    if (body.role === 'restaurant_staff' && !body.restaurantId) {
      return Response.json({
        success: false,
        error: 'Restaurant ID is required for restaurant staff role'
      }, { status: 400 });
    }

    // Register user
    const result: RegisterResponse = await auth.register(body);

    if (result.success) {
      // Send OTP email (in production, integrate with email service)
      console.log(`OTP for ${body.email}: ${result.otp}`);
      
      return Response.json({
        success: true,
        message: result.message,
        otpToken: result.otpToken,
        user: {
          id: result.user?.id,
          email: result.user?.email,
          firstName: result.user?.firstName,
          lastName: result.user?.lastName,
          role: result.user?.role,
          restaurantId: result.user?.restaurantId
        }
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "Registration endpoint - POST to register with role-based authentication",
    supportedRoles: ['customer', 'delivery_partner', 'restaurant_staff'],
    requiredFields: ['email', 'firstName', 'lastName', 'role'],
    optionalFields: ['phone', 'restaurantId']
  });
}
