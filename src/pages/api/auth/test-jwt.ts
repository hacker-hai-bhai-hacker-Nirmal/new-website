// Simple JWT OTP Test Endpoint
// POST /api/auth/test-jwt
import { otpService } from '../../../lib/otpService.js';

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    console.log('JWT OTP Test Started');
    
    // Test with fallback environment
    const otpServiceInstance = new otpService();
    console.log('OTP Service Created');
    
    const otpResult = await otpServiceInstance.generateOTP({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      purpose: 'registration'
    });
    
    console.log('OTP Result:', otpResult);
    
    if (otpResult.success) {
      console.log('OTP Generated Successfully');
      
      // Test verification
      const verifyResult = await otpServiceInstance.verifyOTP({
        email: 'test@example.com',
        otp: otpResult.otp,
        otpToken: otpResult.otpToken
      });
      
      console.log('Verification Result:', verifyResult);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'JWT OTP Test Successful',
          otp: otpResult.otp,
          otpToken: otpResult.otpToken,
          verification: verifyResult
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpResult.error
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
  } catch (error: any) {
    console.error('JWT OTP Test Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
