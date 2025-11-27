// src/pages/api/test-brevo.ts
import type { APIRoute } from 'astro';
import { sendOtpEmail } from '../../lib/brevoService';
import type { EmailResult } from '../../types/brevo';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Test Brevo API with a sample OTP
    const testOtp = '123456';
    const result: EmailResult = await sendOtpEmail('nirmalbajiya@gmail.com', testOtp, 'Nirmal');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Brevo API test completed',
        result: result
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Brevo test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Brevo API test failed' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
