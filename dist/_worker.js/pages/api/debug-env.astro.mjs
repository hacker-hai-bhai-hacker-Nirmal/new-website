globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const GET = async () => {
  try {
    const envVars = {
      brevo_MCP_key: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key ? `Found (length: ${Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key.length})` : "NOT FOUND",
      BREVO_API_KEY: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).BREVO_API_KEY ? `Found (length: ${Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).BREVO_API_KEY.length})` : "NOT FOUND",
      allEnvVars: Object.keys(Object.assign(__vite_import_meta_env__, { OS: process.env.OS })).filter((key) => key.toLowerCase().includes("brevo"))
    };
    return new Response(
      JSON.stringify({
        success: true,
        message: "Environment variable debug information",
        envVars,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Debug env error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Debug failed"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
