// Simple test without JWT imports
export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    console.log('Test endpoint started');
    
    // Get environment variables from locals (Cloudflare Pages)
    const env = locals?.env || import.meta.env;
    console.log('Environment check:', {
      hasEnv: !!locals?.env,
      envKeys: Object.keys(env || {}).slice(0, 5)
    });
    
    const body = await request.json();
    console.log('Request body:', body);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Simple test working',
        received: body,
        envTest: {
          hasJWT: !!env.JWT_SECRET,
          hasBrevo: !!env.brevo_MCP_key
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error: any) {
    console.error('Test endpoint error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
