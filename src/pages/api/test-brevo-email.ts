// Test Brevo email service with the working API key
export async function POST({ request, locals }: { request: Request; locals: any }) {
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
    
    // Test Brevo API connection
    const testResponse = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (testResponse.ok) {
      const accountData = await testResponse.json();
      return Response.json({
        success: true,
        message: "Brevo API key is working!",
        apiKeyLength: brevoApiKey.length,
        accountInfo: {
          email: accountData.email,
          plan: accountData.plan,
          credits: accountData.credits
        },
        timestamp: new Date().toISOString()
      });
    } else {
      const errorData = await testResponse.text();
      return Response.json({
        success: false,
        message: "Brevo API key failed",
        status: testResponse.status,
        error: errorData,
        apiKeyLength: brevoApiKey.length,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    return Response.json({
      success: false,
      message: "Error testing Brevo API",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

export async function GET({ locals }: { locals: any }) {
  try {
    // Get the API key using the correct pattern
    const runtimeEnv = locals?.runtime?.env;
    const brevoApiKey = runtimeEnv?.brevo_MCP_key;
    
    return Response.json({
      success: true,
      message: "Use POST to test Brevo API connection",
      apiKeyAvailable: !!brevoApiKey,
      apiKeyLength: brevoApiKey ? brevoApiKey.length : 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
