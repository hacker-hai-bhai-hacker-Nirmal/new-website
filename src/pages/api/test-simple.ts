// Simple test endpoint to verify server functions are working
export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      message: "Server functions are working!",
      timestamp: new Date().toISOString(),
      environment: "Cloudflare Pages"
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      message: "POST request received!",
      timestamp: new Date().toISOString()
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
