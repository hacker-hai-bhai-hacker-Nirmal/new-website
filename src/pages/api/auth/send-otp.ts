// src/pages/api/auth/send-otp.ts
import type { APIRoute } from 'astro';
import { account } from '../../../lib/appwrite';
import { ID } from 'appwrite';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a session with passwordless email (Appwrite's OTP flow)
    const response = await account.createEmailToken(
      ID.unique(), // User ID (will be created if not exists)
      email
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        userId: response.userId,
        message: 'OTP sent successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send OTP' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
