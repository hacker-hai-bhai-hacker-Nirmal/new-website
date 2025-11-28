// Test endpoint to verify VITE_ prefix theory
// GET /api/test-vite-env

export async function GET({ locals }: { locals: any }): Promise<Response> {
  try {
    // Test different environment access patterns
    const results = {
      timestamp: new Date().toISOString(),
      test: "VITE_ Prefix Analysis",
      patterns: {
        // Test locals.env (server-side)
        localsEnv: {
          APPWRITE_PROJECT_ID: locals?.env?.APPWRITE_PROJECT_ID || 'NOT_FOUND',
          VITE_APPWRITE_PROJECT_ID: locals?.env?.VITE_APPWRITE_PROJECT_ID || 'NOT_FOUND',
          JWT_SECRET: locals?.env?.JWT_SECRET || 'NOT_FOUND',
          brevo_MCP_key: locals?.env?.brevo_MCP_key || 'NOT_FOUND'
        },
        
        // Test import.meta.env (build-time/frontend)
        importMetaEnv: {
          APPWRITE_PROJECT_ID: import.meta.env.APPWRITE_PROJECT_ID || 'NOT_FOUND',
          VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'NOT_FOUND',
          JWT_SECRET: import.meta.env.JWT_SECRET || 'NOT_FOUND',
          brevo_MCP_key: import.meta.env.brevo_MCP_key || 'NOT_FOUND'
        },
        
        // Test all available keys
        allImportMetaKeys: Object.keys(import.meta.env),
        allLocalsKeys: locals?.env ? Object.keys(locals.env) : []
      }
    };

    return new Response(
      JSON.stringify(results, null, 2),
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
        error: 'VITE test failed',
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
