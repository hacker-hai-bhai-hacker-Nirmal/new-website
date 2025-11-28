// Refresh Token API Endpoint
// POST /api/auth/refresh
// Refreshes access tokens using refresh tokens

import { sessionManager } from '../../../lib/sessionManager.js';

interface RefreshRequest {
  refreshToken: string;
}

interface RefreshResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  error?: string;
  message?: string;
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    const body: RefreshRequest = await request.json();
    const { refreshToken } = body;
    
    if (!refreshToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Refresh token is required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP and user agent for audit logging
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Refresh the tokens
    const tokenData = await sessionManager.refreshToken(
      refreshToken,
      ipAddress,
      userAgent
    );

    const response: RefreshResponse = {
      success: true,
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: tokenData.expiresIn,
      message: 'Tokens refreshed successfully'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `accessToken=${tokenData.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${tokenData.expiresIn}`
        }
      }
    );

  } catch (error: any) {
    console.error('Error refreshing token:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Token refresh failed' 
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
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
