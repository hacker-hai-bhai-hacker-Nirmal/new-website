globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
async function POST({ request, locals }) {
  try {
    console.log("Test endpoint started");
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=", OS: process.env.OS });
    console.log("Environment check:", {
      hasEnv: !!locals?.env,
      envKeys: Object.keys(env || {}).slice(0, 5)
    });
    const body = await request.json();
    console.log("Request body:", body);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Simple test working",
        received: body,
        envTest: {
          hasJWT: !!env.JWT_SECRET,
          hasBrevo: !!env.brevo_MCP_key
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Test endpoint error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
