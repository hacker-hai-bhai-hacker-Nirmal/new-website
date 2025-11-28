globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as sessionManager } from '../../../chunks/sessionManager_B2jOmk6k.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  try {
    const body = await request.json();
    const { refreshToken } = body;
    if (!refreshToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Refresh token is required"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const tokenData = await sessionManager.refreshToken(
      refreshToken,
      ipAddress,
      userAgent
    );
    const response = {
      success: true,
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: tokenData.expiresIn,
      message: "Tokens refreshed successfully"
    };
    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `accessToken=${tokenData.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${tokenData.expiresIn}`
        }
      }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Token refresh failed"
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function PUT() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function DELETE() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
