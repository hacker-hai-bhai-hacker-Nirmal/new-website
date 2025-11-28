// Dedicated Brevo API Test Endpoint
// POST /api/test-brevo-api

export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    console.log('🔍 Starting Brevo API Test');
    
    // Test different environment access patterns for Brevo key
    const envPatterns = {
      localsEnv: locals?.env?.brevo_MCP_key,
      localsEnvUpper: locals?.env?.BREVO_MCP_KEY,
      importMeta: import.meta.env.brevo_MCP_key,
      importMetaUpper: import.meta.env.BREVO_MCP_KEY,
      vitePrefixed: import.meta.env.VITE_brevo_MCP_key,
      viteUpper: import.meta.env.VITE_BREVO_MCP_KEY
    };
    
    console.log('🔑 Environment patterns tested:', envPatterns);
    
    // Find the working pattern
    let workingKey = null;
    let workingPattern = null;
    
    for (const [pattern, value] of Object.entries(envPatterns)) {
      if (value && value !== 'NOT_FOUND' && value !== 'NOT_SET' && value.length > 10) {
        workingKey = value;
        workingPattern = pattern;
        break;
      }
    }
    
    if (!workingKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Brevo API key not found in any environment pattern',
          testedPatterns: envPatterns,
          availableEnvKeys: locals?.env ? Object.keys(locals.env) : [],
          availableImportKeys: Object.keys(import.meta.env),
          recommendation: 'Check Cloudflare Pages environment variable configuration'
        }, null, 2),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }
    
    console.log('✅ Found Brevo key using pattern:', workingPattern);
    
    // Test the Brevo API with a simple email
    const testEmail = {
      sender: {
        name: 'Litterateur Test',
        email: 'nirmalbajiya@gmail.com'
      },
      to: [{
        email: 'nirmalbajiya@gmail.com',
        name: 'Test User'
      }],
      subject: '🧪 Brevo API Test - Litterateur',
      htmlContent: `
        <h2>🧪 Brevo API Test Successful!</h2>
        <p>This is a test email from Litterateur to verify the Brevo API integration.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>Pattern Used: ${workingPattern}</li>
          <li>Test Time: ${new Date().toISOString()}</li>
          <li>Environment: Cloudflare Pages</li>
        </ul>
        <p>If you receive this email, the Brevo API is working correctly! 🎉</p>
      `
    };
    
    // Make the API call
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': workingKey
      },
      body: JSON.stringify(testEmail)
    });
    
    const responseData = await response.json();
    
    console.log('📊 Brevo API Response:', response.status, responseData);
    
    // Return comprehensive results
    const result = {
      success: response.ok,
      testTime: new Date().toISOString(),
      environmentTest: {
        workingPattern,
        workingKeyLength: workingKey.length,
        keyPreview: workingKey.substring(0, 20) + '...',
        allPatternsTested: envPatterns
      },
      apiResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      },
      emailTest: {
        to: 'nirmalbajiya@gmail.com',
        subject: testEmail.subject,
        sent: response.ok
      }
    };
    
    return new Response(
      JSON.stringify(result, null, 2),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
    
  } catch (error: any) {
    console.error('❌ Brevo API test failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        troubleshooting: {
          possibleCauses: [
            'Environment variable not configured in Cloudflare Pages',
            'API key is invalid or expired',
            'Network connectivity issues',
            'Brevo API service unavailable'
          ],
          nextSteps: [
            'Check Cloudflare Pages environment variables',
            'Verify API key in Brevo dashboard',
            'Test network connectivity to api.brevo.com'
          ]
        }
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

// Also support GET for testing environment access
export async function GET({ locals }: { locals: any }): Promise<Response> {
  try {
    const envPatterns = {
      localsEnv: locals?.env?.brevo_MCP_key,
      localsEnvUpper: locals?.env?.BREVO_MCP_KEY,
      importMeta: import.meta.env.brevo_MCP_key,
      importMetaUpper: import.meta.env.BREVO_MCP_KEY,
      vitePrefixed: import.meta.env.VITE_brevo_MCP_key,
      viteUpper: import.meta.env.VITE_BREVO_MCP_KEY
    };
    
    return new Response(
      JSON.stringify({
        test: 'Brevo Environment Variable Access Test',
        timestamp: new Date().toISOString(),
        patterns: envPatterns,
        availableEnvKeys: locals?.env ? Object.keys(locals.env) : [],
        availableImportKeys: Object.keys(import.meta.env),
        recommendation: 'Use POST to test actual Brevo API call'
      }, null, 2),
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
