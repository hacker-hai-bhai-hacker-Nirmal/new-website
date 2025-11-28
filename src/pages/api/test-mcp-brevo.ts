// src/pages/api/test-mcp-brevo.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Test the new MCP API key directly
    const BREVO_API_KEY = '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';
    const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
    
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const emailData = {
      sender: {
        name: 'Litterateur MCP Test',
        email: 'nirmalbajiya@gmail.com'
      },
      to: [
        {
          email: 'nirmalbajiya@gmail.com',
          name: 'Nirmal'
        }
      ],
      subject: '🧪 MCP Integration Test - OTP: ' + testOtp,
      htmlContent: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71; text-align: center;">🌿 Litterateur</h2>
            <h3>🧪 MCP Integration Test</h3>
            <p><strong>Your test verification code is:</strong></p>
            <div style="background: #f8f9fa; border: 2px solid #2ecc71; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <span style="font-size: 32px; font-weight: bold; color: #2ecc71;">${testOtp}</span>
            </div>
            <p><strong>This was sent using the MCP-integrated API key.</strong></p>
            <p>If you receive this, the MCP integration is working perfectly!</p>
            <p style="color: #666; margin-top: 30px;">
              Best regards,<br>
              The Litterateur Team
            </p>
          </div>
        </div>
      `
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ 
        success: response.ok,
        message: response.ok ? 'MCP Brevo API test completed successfully' : 'MCP Brevo API test failed',
        otp: testOtp,
        messageId: result.messageId,
        response: result,
        status: response.status
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('MCP Brevo test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'MCP Brevo API test failed' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
