// src/pages/api/debug-mcp.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check environment variables at runtime
    const brevoKey = import.meta.env.brevo_MCP_key;
    
    // Log all environment variables that contain 'brevo' or 'mcp'
    const allEnvVars = Object.keys(import.meta.env);
    const relevantVars = allEnvVars.filter(key => 
      key.toLowerCase().includes('brevo') || 
      key.toLowerCase().includes('mcp')
    );
    
    const envDetails = {};
    relevantVars.forEach(key => {
      const value = import.meta.env[key];
      envDetails[key] = {
        present: !!value,
        length: value?.length || 0,
        firstChars: value ? value.substring(0, 10) + '...' : 'NOT FOUND',
        lastChars: value ? '...' + value.substring(value.length - 10) : 'NOT FOUND'
      };
    });

    // Try to use the key to test Brevo API
    let brevoTestResult = 'Not tested';
    if (brevoKey) {
      try {
        const testResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoKey
          },
          body: JSON.stringify({
            sender: { name: 'Debug Test', email: 'test@example.com' },
            to: [{ email: 'debug@example.com', name: 'Debug' }],
            subject: 'Debug Test',
            htmlContent: '<p>Debug test</p>'
          })
        });
        
        if (testResponse.ok) {
          brevoTestResult = 'SUCCESS - API key works';
        } else {
          const errorData = await testResponse.text();
          brevoTestResult = `FAILED - ${testResponse.status}: ${errorData}`;
        }
      } catch (error) {
        brevoTestResult = `ERROR - ${error.message}`;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        brevo_MCP_key: {
          present: !!brevoKey,
          length: brevoKey?.length || 0,
          firstChars: brevoKey ? brevoKey.substring(0, 10) + '...' : 'NOT FOUND',
          lastChars: brevoKey ? '...' + brevoKey.substring(brevoKey.length - 10) : 'NOT FOUND'
        }
      },
      all_relevant_variables: envDetails,
      brevo_api_test: brevoTestResult,
      deployment_info: {
        node_env: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        prod: import.meta.env.PROD,
        site_url: import.meta.env.SITE
      }
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
