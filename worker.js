// Cloudflare Worker for OTP Email Service
// This will be deployed as a separate Worker that can access environment variables

export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only handle POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    try {
      const { email } = await request.json();
      
      if (!email) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Email is required' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Access environment variable from Cloudflare Workers
      const brevoApiKey = env.brevo_MCP_key;
      
      if (!brevoApiKey) {
        console.error('❌ brevo_MCP_key not found in Worker environment');
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Email service configuration error - brevo_MCP_key not found in Worker environment' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      console.log('✅ brevo_MCP_key found in Worker, length:', brevoApiKey.length);

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
        console.log('✅ Email sent successfully via Brevo Worker!');
        console.log('📧 Message ID:', result.messageId);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'OTP sent successfully!',
          otp: otp, // Return for testing
          emailSent: true,
          messageId: result.messageId,
          deployedVia: 'Cloudflare Worker'
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        throw new Error(result.message || 'Brevo API error');
      }

    } catch (error) {
      console.error('❌ Worker OTP error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send OTP'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
