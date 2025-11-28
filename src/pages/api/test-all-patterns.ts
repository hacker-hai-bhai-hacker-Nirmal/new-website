// Test all possible environment variable access patterns
export async function GET() {
  try {
    // Test different access patterns
    const patterns = {
      import_meta: import.meta.env,
      process_env: process.env,
      global_env: globalThis.process?.env,
    };
    
    const results = {};
    
    for (const [patternName, env] of Object.entries(patterns)) {
      const vars = {
        brevo_MCP_key: env?.brevo_MCP_key,
        JWT_SECRET: env?.JWT_SECRET,
        APPWRITE_PROJECT_ID: env?.APPWRITE_PROJECT_ID,
        APPWRITE_ENDPOINT: env?.APPWRITE_ENDPOINT,
        APPWRITE_DATABASE_ID: env?.APPWRITE_DATABASE_ID,
      };
      
      results[patternName] = {
        available: Object.keys(vars).filter(key => vars[key] !== undefined).length,
        vars: vars,
        hasBrevo: vars.brevo_MCP_key !== undefined,
        hasJWT: vars.JWT_SECRET !== undefined,
      };
    }
    
    return Response.json({
      success: true,
      message: "Test all environment variable access patterns",
      results,
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
