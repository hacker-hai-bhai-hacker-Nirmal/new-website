// Get Current User API Endpoint
// GET /api/auth/me
// Returns information about the currently authenticated user

import { AppwriteService } from '../../../lib/appwriteService.js';
import { authMiddleware } from '../../../middleware/rbac.js';

interface MeResponse {
  success: boolean;
  user?: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    role: string;
    permissions: string[];
    status: string;
    preferences: {
      language: string;
      notificationsEnabled: boolean;
      theme: string;
    };
    lastLoginAt?: string;
    createdAt: string;
  };
  error?: string;
  message?: string;
}

export async function GET({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    // Apply authentication middleware
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult as Response;
    }

    const user = locals.user;
    
    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User not authenticated' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const appwrite = new AppwriteService();

    // Get full user details from database
    const fullUser = await appwrite.getUser(user.userId);
    if (!fullUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User not found' 
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get role information
    const role = await appwrite.getRole(fullUser.roleId);
    if (!role) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User role not found' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Remove sensitive information
    const { 
      verificationToken, 
      verificationTokenExpiry, 
      passwordResetToken, 
      passwordResetTokenExpiry, 
      twoFactorSecret,
      ...safeUser 
    } = fullUser;

    const response: MeResponse = {
      success: true,
      user: {
        ...safeUser,
        role: role.roleName,
        permissions: role.permissions || [],
        lastLoginAt: safeUser.lastLoginAt ? new Date(safeUser.lastLoginAt).toISOString() : undefined,
        createdAt: new Date(safeUser.createdAt).toISOString()
      }
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error fetching user info:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to fetch user information' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle other HTTP methods
export async function POST(): Promise<Response> {
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
