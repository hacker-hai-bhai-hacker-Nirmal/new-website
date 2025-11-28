// Debug endpoint for OTP verification testing

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    const body = await request.json();
    const { email, otp } = body;
    
    console.log('Debug OTP verification:', { email, otp });
    
    // Test basic response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Debug endpoint reached',
        received: { email, otp }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Debug OTP error:', error);
    
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

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      message: 'OTP Debug Endpoint - POST with email and otp to test',
      example: { email: 'test@example.com', otp: '123456' }
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
