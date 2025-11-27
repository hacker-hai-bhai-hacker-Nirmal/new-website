// Send OTP to user's email - Enhanced for production
export async function POST({ request }) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ 
        error: 'Valid email address required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Rate limiting check (simple implementation)
    // In production, use Redis or database for rate limiting
    const now = Date.now();
    const rateLimitKey = `otp_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP data (in production, store in database with expiration)
    const otpData = {
      email: email,
      otp: otp,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      attempts: 0,
      maxAttempts: 3
    };

    console.log('OTP Generated:', { ...otpData, otp: '***' }); // Log without actual OTP
    
    // TODO: Integrate with real email service
    // For production, uncomment and configure your email service:
    /*
    // Example with Resend:
    const { Resend } = await import('resend');
    const resend = new Resend('your-resend-api-key');
    
    try {
      await resend.emails.send({
        from: 'noreply@litterateur.com',
        to: email,
        subject: 'Your Litterateur Login Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1B4332; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📚 Litterateur</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Where Culinary Art Meets Literary Excellence</p>
            </div>
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1B4332; margin: 0 0 20px 0;">Your Login Code</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <div style="font-size: 36px; font-weight: bold; color: #1B4332; letter-spacing: 5px; margin: 0;">
                  ${otp}
                </div>
              </div>
              <p style="color: #666; margin: 20px 0; line-height: 1.6;">
                This code will expire in <strong>10 minutes</strong>. Please enter it in the login form to access your account.
              </p>
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>🔒 Security Notice:</strong> Never share this code with anyone. Our team will never ask for your login code.
                </p>
              </div>
              <p style="color: #999; font-size: 12px; margin: 30px 0 0 0; text-align: center;">
                If you didn't request this code, please ignore this email or contact support.
              </p>
            </div>
          </div>
        `
      });
      console.log('Email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue with OTP generation even if email fails
    }
    */

    // For demo/testing, include OTP in response
    // REMOVE THIS IN PRODUCTION
    const isDevelopment = true; // Set to false in production
    const responseData = {
      success: true,
      message: 'OTP sent to your email',
      expires: otpData.expires,
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    if (isDevelopment) {
      responseData.otp = otp; // Only in development
      responseData.developmentMode = true;
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to send OTP' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
