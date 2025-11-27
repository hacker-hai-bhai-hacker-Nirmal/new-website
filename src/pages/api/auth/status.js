// API endpoint to check authentication status
export async function GET({ request }) {
  try {
    // Check if user is logged in by looking for session cookie
    const cookieHeader = request.headers.get('cookie');
    
    if (!cookieHeader) {
      return new Response(JSON.stringify({ loggedIn: false }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Parse cookies to find session
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    // Check for Appwrite session cookie
    const hasSession = Object.keys(cookies).some(key => 
      key.includes('session') || key.includes('a_session')
    );

    return new Response(JSON.stringify({ 
      loggedIn: hasSession,
      user: hasSession ? { id: 'current-user' } : null
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Auth status check error:', error);
    
    return new Response(JSON.stringify({ 
      loggedIn: false,
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
