// Test the correct Cloudflare Pages environment variable access pattern
export async function GET({ locals }: { locals: any }) {
  try {
    // Test the correct pattern: Astro.locals.runtime.env
    const runtimeEnv = locals?.runtime?.env;
    
    const results = {
      pattern: 'Astro.locals.runtime.env',
      available: false,
      vars: {},
      runtimeEnvType: typeof runtimeEnv,
      runtimeEnvKeys: runtimeEnv ? Object.keys(runtimeEnv) : [],
    };
    
    if (runtimeEnv) {
      const vars = {
        brevo_MCP_key: runtimeEnv.brevo_MCP_key,
        JWT_SECRET: runtimeEnv.JWT_SECRET,
        APPWRITE_PROJECT_ID: runtimeEnv.APPWRITE_PROJECT_ID,
        APPWRITE_ENDPOINT: runtimeEnv.APPWRITE_ENDPOINT,
        APPWRITE_DATABASE_ID: runtimeEnv.APPWRITE_DATABASE_ID,
      };
      
      results.vars = vars;
      results.available = Object.keys(vars).filter(key => vars[key] !== undefined).length > 0;
    }
    
    return Response.json({
      success: true,
      message: "Test correct Cloudflare Pages environment variable pattern",
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
