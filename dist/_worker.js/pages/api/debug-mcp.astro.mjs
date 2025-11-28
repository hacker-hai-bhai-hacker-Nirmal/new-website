globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const GET = async ({ request }) => {
  try {
    const brevoKey = Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).brevo_MCP_key;
    const allEnvVars = Object.keys(Object.assign(__vite_import_meta_env__, { OS: process.env.OS }));
    const relevantVars = allEnvVars.filter(
      (key) => key.toLowerCase().includes("brevo") || key.toLowerCase().includes("mcp")
    );
    const envDetails = {};
    relevantVars.forEach((key) => {
      const value = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })[key];
      envDetails[key] = {
        present: !!value,
        length: value?.length || 0,
        firstChars: value ? value.substring(0, 10) + "..." : "NOT FOUND",
        lastChars: value ? "..." + value.substring(value.length - 10) : "NOT FOUND"
      };
    });
    let brevoTestResult = "Not tested";
    if (brevoKey) {
      try {
        const testResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoKey
          },
          body: JSON.stringify({
            sender: { name: "Debug Test", email: "test@example.com" },
            to: [{ email: "debug@example.com", name: "Debug" }],
            subject: "Debug Test",
            htmlContent: "<p>Debug test</p>"
          })
        });
        if (testResponse.ok) {
          brevoTestResult = "SUCCESS - API key works";
        } else {
          const errorData = await testResponse.text();
          brevoTestResult = `FAILED - ${testResponse.status}: ${errorData}`;
        }
      } catch (error) {
        brevoTestResult = `ERROR - ${error.message}`;
      }
    }
    return new Response(JSON.stringify({
      success: true,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: {
        brevo_MCP_key: {
          present: !!brevoKey,
          length: brevoKey?.length || 0,
          firstChars: brevoKey ? brevoKey.substring(0, 10) + "..." : "NOT FOUND",
          lastChars: brevoKey ? "..." + brevoKey.substring(brevoKey.length - 10) : "NOT FOUND"
        }
      },
      all_relevant_variables: envDetails,
      brevo_api_test: brevoTestResult,
      deployment_info: {
        node_env: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).MODE,
        dev: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).DEV,
        prod: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).PROD,
        site_url: Object.assign(__vite_import_meta_env__, { OS: process.env.OS }).SITE
      }
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
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
