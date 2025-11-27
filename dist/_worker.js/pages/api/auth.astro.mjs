globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

// API endpoint for authentication
// DEPRECATED: This API endpoint is no longer used
// Password authentication has been removed in favor of OTP-only authentication
// Use /api/auth/send-otp and /api/auth/verify-otp instead

async function POST({ request }) {
  return new Response(JSON.stringify({ 
    error: 'Password authentication has been deprecated. Please use OTP-based authentication.',
    message: 'Visit /otp-login to use the new secure authentication system.',
    otp_login_url: '/otp-login'
  }), {
    status: 410, // Gone
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
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
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
