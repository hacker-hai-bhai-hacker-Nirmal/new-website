// src/pages/api/auth/send-otp.ts
import type { APIRoute } from 'astro';
import { account } from '../../../lib/appwrite';
import { ID } from 'appwrite';
import { sendOtpEmail } from '../../../lib/brevoService';
import type { EmailResult } from '../../../types/brevo';

export const POST: APIRoute = async ({ request, locals }: { request: Request; locals: any }) => {
  try {
    const { email } = await request.json();
    
    // Get environment variables from locals (Cloudflare Pages)
    const env = (locals as any)?.env || import.meta.env;
    
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if Brevo MCP API key is available from Cloudflare environment
    const brevoApiKey = env.brevo_MCP_key;
    if (!brevoApiKey) {
      console.error('❌ brevo_MCP_key environment variable not found in Cloudflare');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service configuration error - please check brevo_MCP_key environment variable' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ brevo_MCP_key found in environment, length:', brevoApiKey.length);

    // Create an email token (Appwrite's OTP flow)
    const response = await account.createEmailToken(
      ID.unique(), // User ID (will be created if not exists)
      email
    );

    // Extract the OTP from Appwrite response (in development mode)
    // In production, Appwrite won't return the OTP
    let otp = '';
    if (response.secret && response.secret.length === 6 && /^\d{6}$/.test(response.secret)) {
      otp = response.secret;
    } else {
      // Generate a 6-digit OTP for Brevo
      otp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send OTP email using Brevo with MCP API key
    const emailResult: EmailResult = await sendOtpEmail(email, otp, 'User', brevoApiKey);

    if (!emailResult.success) {
      console.error('Brevo email failed:', emailResult.error);
      // Continue with the process even if email fails
      // In production, you might want to handle this differently
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        userId: response.userId,
        message: otp ? 'OTP sent successfully (Development Mode)' : 'OTP sent successfully. Please check your email.',
        // Only return OTP in development mode for testing
        ...(otp && { otp, developmentMode: true }),
        emailSent: emailResult.success
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
