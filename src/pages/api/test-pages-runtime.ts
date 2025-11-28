// Test Cloudflare Pages runtime environment variable access
export async function GET({ locals }: { locals: any }) {
  try {
    // Test Cloudflare Pages specific patterns
    const patterns = {
      locals_env: locals?.env,
      locals_Astro_env: locals?.Astro?.env,
      cloudflare_env: (globalThis as any).cloudflare?.env,
      runtime_env: (globalThis as any).runtime?.env,
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
        envType: typeof env,
        envKeys: env ? Object.keys(env) : [],
      };
    }
    
    // Also test if we can access Astro's env
    const astroEnv = (globalThis as any).Astro?.env;
    
    return Response.json({
      success: true,
      message: "Test Cloudflare Pages runtime environment variable access",
      results,
      astroEnvAvailable: astroEnv !== undefined,
      astroEnvKeys: astroEnv ? Object.keys(astroEnv) : [],
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
