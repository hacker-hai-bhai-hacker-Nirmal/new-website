// Check email delivery status and Brevo account details
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
    
    // Check Brevo account status and recent activity
    const accountResponse = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    let accountInfo = null;
    if (accountResponse.ok) {
      accountInfo = await accountResponse.json();
    }
    
    // Check SMTP logs or recent email activity
    const smtpResponse = await fetch('https://api.brevo.com/v3/smtp/log', {
      method: 'GET',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    let smtpLogs = null;
    if (smtpResponse.ok) {
      smtpLogs = await smtpResponse.json();
    }
    
    // Send a simple test email with different configuration
    const simpleEmailData = {
      sender: {
        name: "Test System",
        email: "noreply@example.com"
      },
      to: [{
        email: "nirmalbajiya@gmail.com",
        name: "Nirmal Bajiya"
      }],
      subject: "Simple Test Email - Please Confirm Receipt",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🧪 Simple Test Email</h2>
          <p>This is a simple test email to verify delivery.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> New Website Test System</p>
          <p><strong>To:</strong> nirmalbajiya@gmail.com</p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            If you receive this email, please reply to confirm delivery.
          </p>
        </div>
      `
    };
    
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simpleEmailData)
    });
    
    let emailResult = null;
    if (emailResponse.ok) {
      emailResult = await emailResponse.json();
    } else {
      const errorText = await emailResponse.text();
      return Response.json({
        success: false,
        message: "Failed to send simple test email",
        status: emailResponse.status,
        error: errorText,
        accountInfo,
        smtpLogs,
        timestamp: new Date().toISOString()
      });
    }
    
    return Response.json({
      success: true,
      message: "Simple test email sent successfully!",
      emailResult,
      accountInfo: {
        email: accountInfo?.email,
        plan: accountInfo?.plan,
        credits: accountInfo?.credits
      },
      smtpLogs: smtpLogs ? {
        totalLogs: smtpLogs.length || 0,
        recentLogs: (smtpLogs.logs || []).slice(0, 3)
      } : null,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    return Response.json({
      success: false,
      message: "Error checking email status",
      error: error?.message || String(error),
      timestamp: new Date().toISOString()
    });
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "Use POST to check email status and send simple test",
    timestamp: new Date().toISOString()
  });
}
