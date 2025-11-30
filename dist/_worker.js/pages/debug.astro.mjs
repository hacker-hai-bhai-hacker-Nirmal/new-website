globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, f as createAstro, n as renderHead, l as renderScript, r as renderTemplate } from '../chunks/astro/server_OziQ-2Q1.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const Astro = $$Astro;
const prerender = false;
async function GET() {
  const isServer = typeof Astro !== "undefined";
  const runtimeEnv = Astro?.locals?.runtime?.env || {};
  const envVars = {
    JWT_SECRET: runtimeEnv.JWT_SECRET || "NOT_FOUND",
    brevo_MCP_key: runtimeEnv.brevo_MCP_key ? "FOUND" : "NOT_FOUND",
    APPWRITE_PROJECT_ID: runtimeEnv.APPWRITE_PROJECT_ID || "NOT_FOUND",
    APPWRITE_ENDPOINT: runtimeEnv.APPWRITE_ENDPOINT || "NOT_FOUND",
    APPWRITE_DATABASE_ID: runtimeEnv.APPWRITE_DATABASE_ID || "NOT_FOUND"
  };
  const apiEndpoints = [
    "/api/auth",
    "/api/auth/register",
    "/api/auth/verify-otp",
    "/api/auth/me",
    "/api/auth/refresh",
    "/api/test-auth",
    "/api/check-env"
  ];
  return Response.json({
    debugSession: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      purpose: "Diagnose API routes 404 issue",
      mode: isServer ? "SERVER" : "CLIENT"
    },
    environmentCheck: {
      status: "Environment Variables Test",
      variables: envVars,
      allFound: Object.values(envVars).every((v) => v !== "NOT_FOUND")
    },
    apiRoutesTest: {
      status: "API Routes Availability Test",
      endpoints: apiEndpoints.map((endpoint) => ({
        path: endpoint,
        expectedStatus: "Should return 200 or proper error",
        actualStatus: "UNKNOWN - Test via frontend"
      }))
    },
    systemInfo: {
      astroVersion: "5.16.1",
      adapter: "@astrojs/cloudflare",
      outputMode: "server",
      deploymentPlatform: "Cloudflare Pages"
    },
    nextSteps: [
      "1. Check if environment variables are accessible",
      "2. Test API endpoints via frontend JavaScript",
      "3. Verify Cloudflare Pages Functions configuration",
      "4. Check build output for API routes"
    ],
    troubleshooting: {
      possibleCauses: [
        "Cloudflare Pages Functions not enabled",
        "Environment variables not properly configured",
        "Build configuration issue",
        "API routes not being compiled correctly",
        "Server mode not properly activated"
      ],
      testsToRun: [
        "Environment variable access test",
        "API endpoint fetch test",
        "Build output verification",
        "Cloudflare configuration check"
      ]
    }
  });
}
async function POST({ request }) {
  try {
    const body = await request.json();
    const { action, endpoint } = body;
    if (action === "test-api") {
      const response = await fetch(`https://c66224ef.new-website-1ce.pages.dev${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const status = response.status;
      const statusText = response.statusText;
      let responseText = "";
      try {
        responseText = await response.text();
      } catch (e) {
        responseText = "Could not read response body";
      }
      return Response.json({
        action: "api-test-result",
        endpoint,
        status,
        statusText,
        responseText: responseText.substring(0, 500),
        // Limit response size
        success: status !== 404
      });
    }
    if (action === "test-env") {
      const runtimeEnv = Astro.locals?.runtime?.env || {};
      return Response.json({
        action: "env-test-result",
        variables: {
          JWT_SECRET: runtimeEnv.JWT_SECRET ? "FOUND" : "NOT_FOUND",
          brevo_MCP_key: runtimeEnv.brevo_MCP_key ? "FOUND" : "NOT_FOUND",
          APPWRITE_PROJECT_ID: runtimeEnv.APPWRITE_PROJECT_ID || "NOT_FOUND",
          APPWRITE_ENDPOINT: runtimeEnv.APPWRITE_ENDPOINT || "NOT_FOUND",
          APPWRITE_DATABASE_ID: runtimeEnv.APPWRITE_DATABASE_ID || "NOT_FOUND"
        },
        success: true
      });
    }
    return Response.json({
      error: "Unknown action",
      availableActions: ["test-api", "test-env"],
      received: action
    });
  } catch (error) {
    return Response.json({
      error: "Server error",
      message: error?.message || "Unknown error",
      success: false
    }, { status: 500 });
  }
}
const $$Debug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Debug;
  return renderTemplate`<html lang="en" data-astro-cid-6tqurwfq> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Debug Test - API Routes Diagnosis</title>${renderHead()}</head> <body data-astro-cid-6tqurwfq> <div class="container" data-astro-cid-6tqurwfq> <h1 data-astro-cid-6tqurwfq>🔍 Debug Test - API Routes Diagnosis</h1> <p data-astro-cid-6tqurwfq><strong data-astro-cid-6tqurwfq>Purpose:</strong> Find root cause of API routes returning 404 errors</p> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>📊 Initial Server Status</h3> <div id="server-status" data-astro-cid-6tqurwfq>Loading server status...</div> <button onclick="loadServerStatus()" data-astro-cid-6tqurwfq>🔄 Reload Server Status</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>🔧 Environment Variables Test</h3> <div id="env-test" data-astro-cid-6tqurwfq>Not tested yet</div> <button onclick="testEnvironment()" data-astro-cid-6tqurwfq>🌍 Test Environment Variables</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>🌐 API Endpoints Test</h3> <div id="api-test" data-astro-cid-6tqurwfq>Not tested yet</div> <button onclick="testAPI('/api/auth')" data-astro-cid-6tqurwfq>🔗 Test /api/auth</button> <button onclick="testAPI('/api/auth/register')" data-astro-cid-6tqurwfq>🔗 Test /api/auth/register</button> <button onclick="testAPI('/api/test-auth')" data-astro-cid-6tqurwfq>🔗 Test /api/test-auth</button> <button onclick="testAPI('/api/check-env')" data-astro-cid-6tqurwfq>🔗 Test /api/check-env</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>📋 All API Tests</h3> <button onclick="testAllAPIs()" data-astro-cid-6tqurwfq>🚀 Run All API Tests</button> <div id="all-api-results" data-astro-cid-6tqurwfq></div> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>🎯 Diagnosis Summary</h3> <div id="diagnosis" data-astro-cid-6tqurwfq>Run tests above to see diagnosis</div> </div> </div> ${renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/debug.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/debug.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/debug.astro";
const $$url = "/debug";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  default: $$Debug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
