globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

// API endpoint to check authentication status
async function GET({ request }) {
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

async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
