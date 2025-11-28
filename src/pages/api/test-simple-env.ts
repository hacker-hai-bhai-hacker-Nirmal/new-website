// Simple environment variable test
export async function GET() {
  try {
    // Test direct access to import.meta.env
    console.log('=== ENV DEBUG ===');
    console.log('All import.meta.env keys:', Object.keys(import.meta.env));
    
    const directAccess = {
      brevo_MCP_key: import.meta.env.brevo_MCP_key,
      JWT_SECRET: import.meta.env.JWT_SECRET,
      APPWRITE_PROJECT_ID: import.meta.env.APPWRITE_PROJECT_ID,
      APPWRITE_ENDPOINT: import.meta.env.APPWRITE_ENDPOINT,
      APPWRITE_DATABASE_ID: import.meta.env.APPWRITE_DATABASE_ID,
    };
    
    console.log('Direct access results:', directAccess);
    
    return Response.json({
      success: true,
      message: "Direct environment variable test",
      directAccess,
      allKeys: Object.keys(import.meta.env),
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
