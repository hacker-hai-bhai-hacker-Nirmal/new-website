// src/pages/api/auth/verify-otp.ts
import type { APIRoute } from 'astro';
import { account } from '../../../lib/appwrite';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userId, otp } = await request.json();
    
    if (!userId || !otp) {
      return new Response(
        JSON.stringify({ success: false, error: 'User ID and OTP are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create session using the email token (OTP)
    const session = await account.createSession(
      userId,
      otp
    );
    
    // Get user details
    const user = await account.get();

    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionId: session.$id,
        userId: session.userId,
        user: user,
        message: 'OTP verified successfully' 
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Invalid or expired OTP' 
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
