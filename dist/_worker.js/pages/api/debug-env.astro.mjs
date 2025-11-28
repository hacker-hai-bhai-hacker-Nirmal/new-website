globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const GET = async ({ locals, request }) => {
  try {
    const patterns = {
      locals: locals?.env,
      import: Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_ENDPOINT: "https://fra.cloud.appwrite.io/v1", APPWRITE_DATABASE_ID: "main-db", OS: process.env.OS }),
      request: request?.cf?.env
    };
    let workingPattern = "NONE";
    let selectedEnv = patterns.import;
    for (const [name, env] of Object.entries(patterns)) {
      if (env?.JWT_SECRET || env?.brevo_MCP_key) {
        workingPattern = name;
        selectedEnv = env;
        break;
      }
    }
    const envVars = {
      brevo_MCP_key: selectedEnv?.brevo_MCP_key ? `Found (length: ${selectedEnv.brevo_MCP_key.length})` : "NOT FOUND",
      JWT_SECRET: selectedEnv?.JWT_SECRET ? "SET" : "NOT_SET",
      APPWRITE_PROJECT_ID: selectedEnv?.APPWRITE_PROJECT_ID ? "SET" : "NOT_SET",
      APPWRITE_ENDPOINT: selectedEnv?.APPWRITE_ENDPOINT ? "SET" : "NOT_SET",
      APPWRITE_DATABASE_ID: selectedEnv?.APPWRITE_DATABASE_ID ? "SET" : "NOT_SET"
    };
    return new Response(
      JSON.stringify({
        success: true,
        message: "Minimal environment variable test",
        workingPattern,
        envVars,
        recommendation: workingPattern !== "NONE" ? `Use ${workingPattern} pattern` : "No pattern found",
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
const POST = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_ENDPOINT: "https://fra.cloud.appwrite.io/v1", APPWRITE_DATABASE_ID: "main-db", OS: process.env.OS });
    console.log("POST Debug Test Started");
    const postTest = {
      success: true,
      message: "POST endpoint working",
      requestReceived: !!body,
      bodyKeys: body ? Object.keys(body) : [],
      environmentAccessible: !!env,
      envVars: {
        JWT_SECRET: !!env.JWT_SECRET,
        brevo_MCP_key: !!env.brevo_MCP_key
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("POST Test Result:", postTest);
    return new Response(
      JSON.stringify(postTest),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST Debug error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "POST debug failed"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
