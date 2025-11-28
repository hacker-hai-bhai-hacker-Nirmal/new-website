// Minimal test endpoint
export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      success: true,
      message: 'Minimal test working',
      timestamp: new Date().toISOString()
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(): Promise<Response> {
  return new Response(
    JSON.stringify({ 
      success: true,
      message: 'Minimal POST test working',
      timestamp: new Date().toISOString()
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
