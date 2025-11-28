// src/pages/api/send-otp-pages.ts
// Pages deployment using the same multi-method environment access as Workers

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use the same multi-method environment access as Workers
    let brevoApiKey = null;
    let accessMethod = 'none';
    
    // Method 1: locals.env (Pages specific)
    if (locals?.env?.brevo_MCP_key) {
      brevoApiKey = locals.env.brevo_MCP_key;
      accessMethod = 'locals.env';
      console.log('✅ Found brevo_MCP_key via locals.env');
    }
    
    // Method 2: import.meta.env (Astro/Cloudflare Pages)
    if (!brevoApiKey && import.meta.env.brevo_MCP_key) {
      brevoApiKey = import.meta.env.brevo_MCP_key;
      accessMethod = 'import.meta.env';
      console.log('✅ Found brevo_MCP_key via import.meta.env');
    }
    
    // Method 3: process.env (Node.js/Workers)
    if (!brevoApiKey && (process.env as any)?.brevo_MCP_key) {
      brevoApiKey = (process.env as any).brevo_MCP_key;
      accessMethod = 'process.env';
      console.log('✅ Found brevo_MCP_key via process.env');
    }
    
    // Method 4: globalThis.env (Cloudflare Workers)
    if (!brevoApiKey && (globalThis as any)?.env?.brevo_MCP_key) {
      brevoApiKey = (globalThis as any).env.brevo_MCP_key;
      accessMethod = 'globalThis.env';
      console.log('✅ Found brevo_MCP_key via globalThis.env');
    }

    // Debug: Show all available environment variables
    const debugInfo = {
      accessMethod,
      localsEnvKeys: locals?.env ? Object.keys(locals.env) : [],
      importMetaKeys: Object.keys(import.meta.env),
      processEnvKeys: process.env ? Object.keys(process.env) : [],
      globalThisEnvKeys: (globalThis as any)?.env ? Object.keys((globalThis as any).env) : [],
      localsHasBrevo: !!locals?.env?.brevo_MCP_key,
      importMetaHasBrevo: !!import.meta.env.brevo_MCP_key,
      processHasBrevo: !!(process.env as any)?.brevo_MCP_key,
      globalThisHasBrevo: !!(globalThis as any)?.env?.brevo_MCP_key
    };

    if (!brevoApiKey) {
      console.error('❌ brevo_MCP_key not found in any environment');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service configuration error - brevo_MCP_key not found in any environment context',
          debug: debugInfo
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ brevo_MCP_key found via:', accessMethod, 'length:', brevoApiKey.length);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email using Brevo API (same as Workers)
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
            accessMethod,
            keyLength: brevoApiKey.length,
            keyPreview: brevoApiKey.substring(0, 20) + '...',
            environmentDebug: debugInfo
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
        error: error.message || 'Failed to send OTP',
        stack: error.stack
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Also support GET for testing environment access
export async function GET({ locals }: { locals: any }) {
  try {
    // Test all environment access methods
    const methods = {
      localsEnv: locals?.env?.brevo_MCP_key || 'NOT_FOUND',
      importMetaEnv: import.meta.env.brevo_MCP_key || 'NOT_FOUND',
      processEnv: (process.env as any)?.brevo_MCP_key || 'NOT_FOUND',
      globalThisEnv: (globalThis as any)?.env?.brevo_MCP_key || 'NOT_FOUND'
    };

    const debugInfo = {
      timestamp: new Date().toISOString(),
      test: 'Pages Environment Access Test',
      methods,
      availableKeys: {
        localsEnv: locals?.env ? Object.keys(locals.env) : [],
        importMetaEnv: Object.keys(import.meta.env),
        processEnv: process.env ? Object.keys(process.env) : [],
        globalThisEnv: (globalThis as any)?.env ? Object.keys((globalThis as any).env) : []
      },
      workingMethod: Object.entries(methods).find(([method, value]) => 
        value && value !== 'NOT_FOUND' && value.length > 10
      )?.[0] || 'none'
    };

    return new Response(
      JSON.stringify(debugInfo, null, 2),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Environment test failed',
        message: error.message,
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}
