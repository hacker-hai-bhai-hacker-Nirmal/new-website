// Send test email using verified sender address
export async function POST({ locals }: { locals: any }) {
  try {
    // Get the API key using the correct pattern
    const runtimeEnv = locals?.runtime?.env;
    const brevoApiKey = runtimeEnv?.brevo_MCP_key;
    
    if (!brevoApiKey) {
      return Response.json({
        success: false,
        error: "Brevo API key not available",
        timestamp: new Date().toISOString()
      });
    }
    
    // Send email using your own email as sender (Brevo allows this)
    const verifiedEmailData = {
      sender: {
        name: "New Website System",
        email: "nirmalbajiya@gmail.com" // Using your verified email
      },
      to: [{
        email: "nirmalbajiya@gmail.com",
        name: "Nirmal Bajiya"
      }],
      subject: "✅ VERIFIED: Environment Variables Working - Final Test",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
          <div style="background: #28a745; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🎉 SUCCESS CONFIRMED</h1>
            <p style="margin: 10px 0 0 0;">Environment Variables Are Working!</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #333;">📧 Email Delivery Test</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p><strong>This email was sent using:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>✅ Working Brevo API Key</li>
                <li>✅ Correct Environment Variable Access</li>
                <li>✅ Verified Sender Address</li>
                <li>✅ Cloudflare Pages Runtime</li>
              </ul>
            </div>
            
            <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">🔧 Technical Details</h3>
              <p><strong>Access Pattern:</strong> <code style="background: #f1f1f1; padding: 2px 6px;">Astro.locals.runtime.env</code></p>
              <p><strong>Sent From:</strong> New Website Test System</p>
              <p><strong>Sent To:</strong> nirmalbajiya@gmail.com</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">✅ DELIVERED</span></p>
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">📊 Account Status</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Account:</strong> nirmalbajiya@gmail.com</li>
                <li><strong>Plan:</strong> Free (291 credits remaining)</li>
                <li><strong>API Status:</strong> Fully Functional</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px;">
              <h3 style="color: #333;">🎯 Mission Accomplished!</h3>
              <p style="color: #666;">If you're reading this email, then:</p>
              <ul style="text-align: left; display: inline-block; margin: 15px 0;">
                <li>✅ Environment variables are working</li>
                <li>✅ Brevo email service is functional</li>
                <li>✅ Your system is ready for production</li>
              </ul>
              <p style="color: #28a745; font-weight: bold; margin-top: 20px;">
                🎉 Cloudflare Environment Variable Debugging - COMPLETE!
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This is an automated test email from New Website System</p>
            <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `
    };
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(verifiedEmailData)
    });
    
    if (response.ok) {
      const result = await response.json();
      return Response.json({
        success: true,
        message: "Verified sender test email sent successfully!",
        emailId: result.messageId,
        recipient: "nirmalbajiya@gmail.com",
        sender: "nirmalbajiya@gmail.com (verified)",
        timestamp: new Date().toISOString()
      });
    } else {
      const errorData = await response.text();
      return Response.json({
        success: false,
        message: "Failed to send verified sender email",
        status: response.status,
        error: errorData,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error: any) {
    return Response.json({
      success: false,
      message: "Error sending verified email",
      error: error?.message || String(error),
      timestamp: new Date().toISOString()
    });
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "Use POST to send verified sender test email",
    timestamp: new Date().toISOString()
  });
}
