// Logout API Endpoint
// POST /api/auth/logout
// Logs out user by revoking their session

import { sessionManager } from '../../../lib/sessionManager.js';
import { authMiddleware } from '../../../middleware/rbac.js';

interface LogoutResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
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

    // Get client IP and user agent for audit logging
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Revoke the session
    await sessionManager.revokeSession(
      user.sessionId,
      user.userId,
      ipAddress,
      userAgent
    );

    const response: LogoutResponse = {
      success: true,
      message: 'Logged out successfully'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': 'accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0' // Clear cookie
        }
      }
    );

  } catch (error: any) {
    console.error('Error during logout:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Logout failed' 
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
