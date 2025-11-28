// src/pages/api/send-otp-worker.ts
// Alternative implementation using Cloudflare Workers approach

export const POST = async (request: Request) => {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Try multiple ways to access the environment variable
    let brevoApiKey = null;
    
    // Method 1: import.meta.env (Astro/Cloudflare Pages)
    if (import.meta.env.brevo_MCP_key) {
      brevoApiKey = import.meta.env.brevo_MCP_key;
      console.log('✅ Found brevo_MCP_key via import.meta.env');
    }
    
    // Method 2: process.env (Node.js/Workers)
    if (!brevoApiKey && (process.env as any)?.brevo_MCP_key) {
      brevoApiKey = (process.env as any).brevo_MCP_key;
      console.log('✅ Found brevo_MCP_key via process.env');
    }
    
    // Method 3: globalThis.env (Cloudflare Workers)
    if (!brevoApiKey && (globalThis as any)?.env?.brevo_MCP_key) {
      brevoApiKey = (globalThis as any).env.brevo_MCP_key;
      console.log('✅ Found brevo_MCP_key via globalThis.env');
    }

    if (!brevoApiKey) {
      console.error('❌ brevo_MCP_key not found in any environment');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service configuration error - brevo_MCP_key not found in any environment context',
          debug: {
            importMetaEnv: !!import.meta.env.brevo_MCP_key,
            processEnv: !!(process.env as any)?.brevo_MCP_key,
            globalThisEnv: !!(globalThis as any)?.env?.brevo_MCP_key
          }
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ brevo_MCP_key found, length:', brevoApiKey.length);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email using Brevo API
    const emailData = {
      sender: {
        name: 'Litterateur',
        email: 'nirmalbajiya@gmail.com'
      },
      to: [
        {
          email: email,
          name: 'User'
        }
      ],
      subject: '🌿 Litterateur OTP - Your Verification Code',
      htmlContent: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71; text-align: center;">🌿 Litterateur</h2>
            <h3>Your Verification Code</h3>
            <p><strong>Your one-time password is:</strong></p>
            <div style="background: #f8f9fa; border: 2px solid #2ecc71; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <span style="font-size: 32px; font-weight: bold; color: #2ecc71;">${otp}</span>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              The Litterateur Team
            </p>
          </div>
        </div>
      `
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    
    if (response.ok && result.messageId) {
      console.log('✅ Email sent successfully via Brevo!');
      console.log('📧 Message ID:', result.messageId);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'OTP sent successfully!',
          otp: otp, // Return for testing
          emailSent: true,
          messageId: result.messageId,
          debug: {
            envMethod: brevoApiKey === import.meta.env.brevo_MCP_key ? 'import.meta.env' : 
                      brevoApiKey === (process.env as any)?.brevo_MCP_key ? 'process.env' : 'globalThis.env'
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error(result.message || 'Brevo API error');
    }

  } catch (error: any) {
    console.error('❌ Send OTP error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send OTP'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
