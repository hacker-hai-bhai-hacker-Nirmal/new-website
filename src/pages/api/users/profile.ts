// User Profile Management API Endpoint
// GET /api/users/profile - Get current user profile
// PUT /api/users/profile - Update current user profile

import { AppwriteService } from '../../../lib/appwriteService.js';
import { authMiddleware, requireSelfAccessOrRole } from '../../../middleware/rbac.js';

interface ProfileResponse {
  success: boolean;
  user?: any;
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
    
    // Remove sensitive information
    const { 
      verificationToken, 
      verificationTokenExpiry, 
      passwordResetToken, 
      passwordResetTokenExpiry, 
      twoFactorSecret,
      ...safeUser 
    } = fullUser;

    const response: ProfileResponse = {
      success: true,
      user: {
        ...safeUser,
        role: role?.roleName,
        permissions: role?.permissions || [],
        lastLoginAt: safeUser.lastLoginAt ? new Date(safeUser.lastLoginAt).toISOString() : undefined,
        createdAt: new Date(safeUser.createdAt).toISOString(),
        updatedAt: new Date(safeUser.updatedAt).toISOString()
      }
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to fetch user profile' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT({ request, locals }: { request: Request; locals: any }): Promise<Response> {
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

    const updates = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Validate what can be updated (non-admin users can only update certain fields)
    const allowedFields = ['firstName', 'lastName', 'profileImage', 'preferences'];
    const isAdmin = user.role === 'admin';
    
    if (!isAdmin) {
      // Non-admin users can only update specific fields
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([key]) => allowedFields.includes(key))
      );
      
      // Validate preferences structure if provided
      if (filteredUpdates.preferences) {
        const { preferences } = filteredUpdates;
        if (typeof preferences !== 'object' || preferences === null) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Invalid preferences format' 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Validate preference fields
        const validPreferenceKeys = ['language', 'notificationsEnabled', 'theme'];
        const invalidKeys = Object.keys(preferences).filter(key => !validPreferenceKeys.includes(key));
        
        if (invalidKeys.length > 0) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Invalid preference fields: ${invalidKeys.join(', ')}` 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
      
      Object.assign(updates, filteredUpdates);
    }

    const appwrite = new AppwriteService();
    const previousData = await appwrite.getUser(user.userId);
    
    if (!previousData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'User not found' 
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update user
    const updatedUser = await appwrite.updateUser(user.userId, {
      ...updates,
      updatedAt: new Date()
    });

    // Log the update
    await appwrite.createAuditLog({
      auditId: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.userId,
      action: 'profile_updated',
      resource: 'users',
      resourceId: user.userId,
      previousValue: { 
        firstName: previousData.firstName, 
        lastName: previousData.lastName,
        preferences: previousData.preferences
      },
      newValue: { 
        firstName: updatedUser.firstName, 
        lastName: updatedUser.lastName,
        preferences: updatedUser.preferences
      },
      ipAddress,
      userAgent,
      status: 'success',
      timestamp: new Date()
    });

    // Remove sensitive information from response
    const { 
      verificationToken, 
      verificationTokenExpiry, 
      passwordResetToken, 
      passwordResetTokenExpiry, 
      twoFactorSecret,
      ...safeUser 
    } = updatedUser;

    const response: ProfileResponse = {
      success: true,
      user: safeUser,
      message: 'Profile updated successfully'
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error updating user profile:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to update user profile' 
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

export async function DELETE(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
