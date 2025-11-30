globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true, "VITE_APPWRITE_API_KEY": "standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75", "VITE_APPWRITE_COLLECTION_MENU": "menu_items", "VITE_APPWRITE_COLLECTION_ORDERS": "orders", "VITE_APPWRITE_COLLECTION_USERS": "users", "VITE_APPWRITE_DATABASE_ID": "main-db", "VITE_APPWRITE_ENDPOINT": "https://fra.cloud.appwrite.io/v1", "VITE_APPWRITE_PROJECT_ID": "6900b1ed001604d8befb", "VITE_FRONTEND_URL": "http://localhost:3000", "VITE_USER_NODE_ENV": "development"};
const GET = async ({ request }) => {
  try {
    const brevoKey = Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key;
    const allVars = Object.keys(Object.assign(__vite_import_meta_env__, { OS: process.env.OS })).filter(
      (k) => k.toLowerCase().includes("brevo") || k.toLowerCase().includes("mcp")
    );
    const envInfo = {
      brevo_MCP_key_present: !!brevoKey,
      brevo_MCP_key_length: brevoKey?.length || 0,
      brevo_MCP_key_first_chars: brevoKey?.substring(0, 10) + "..." || "NOT FOUND",
      all_environment_variables: allVars,
      node_env: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).MODE,
      dev: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).DEV,
      prod: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).PROD
    };
    return new Response(JSON.stringify({
      success: true,
      message: "Environment variable check completed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...envInfo,
      deployment_status: brevoKey ? "ENVIRONMENT_VARIABLES_WORKING" : "ENVIRONMENT_VARIABLES_MISSING"
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Environment check error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Environment check failed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
