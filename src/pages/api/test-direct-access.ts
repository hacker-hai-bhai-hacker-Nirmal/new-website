// Direct access test for environment variables
export async function GET() {
  try {
    // Test direct access to all environment variables
    const directValues = {
      brevo_MCP_key: import.meta.env.brevo_MCP_key,
      JWT_SECRET: import.meta.env.JWT_SECRET,
      APPWRITE_PROJECT_ID: import.meta.env.APPWRITE_PROJECT_ID,
      APPWRITE_ENDPOINT: import.meta.env.APPWRITE_ENDPOINT,
      APPWRITE_DATABASE_ID: import.meta.env.APPWRITE_DATABASE_ID,
    };
    
    // Check what's actually available
    const availableVars = {};
    for (const [key, value] of Object.entries(directValues)) {
      availableVars[key] = {
        exists: value !== undefined,
        value: value ? `${value.substring(0, 20)}...` : 'undefined',
        type: typeof value,
        length: value ? value.length : 0
      };
    }
    
    return Response.json({
      success: true,
      message: "Direct environment variable access test",
      availableVars,
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
