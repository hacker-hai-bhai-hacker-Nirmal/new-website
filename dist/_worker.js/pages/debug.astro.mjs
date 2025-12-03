globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, f as createAstro, r as renderTemplate, l as renderScript, n as defineScriptVars, o as renderHead } from '../chunks/astro/server_CKD2j12W.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
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
  return Astro.props.debugData = {
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
        "Cloudflare configuration check",
        "Test API endpoint from server side"
      ]
    }
  };
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
      const data = await response.text();
      return Response.json({
        endpoint,
        status: response.status,
        statusText: response.statusText,
        data: data.substring(0, 500),
        // Limit response size
        success: response.ok
      });
    } else if (action === "test-env") {
      const runtimeEnv = Astro?.locals?.runtime?.env || {};
      const envVars = {
        brevo_MCP_key: runtimeEnv?.brevo_MCP_key ? "FOUND" : "NOT_FOUND",
        JWT_SECRET: runtimeEnv?.JWT_SECRET ? "FOUND" : "NOT_FOUND",
        APPWRITE_PROJECT_ID: runtimeEnv?.APPWRITE_PROJECT_ID || "NOT_FOUND",
        APPWRITE_ENDPOINT: runtimeEnv?.APPWRITE_ENDPOINT || "NOT_FOUND",
        APPWRITE_DATABASE_ID: runtimeEnv?.APPWRITE_DATABASE_ID || "NOT_FOUND"
      };
      return Response.json({
        action: "test-env",
        environment: envVars,
        allFound: Object.values(envVars).every((v) => v !== "NOT_FOUND"),
        success: true
      });
    } else {
      return Response.json({
        error: "Invalid action",
        availableActions: ["test-api", "test-env"],
        received: action
      });
    }
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
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-6tqurwfq> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Debug Test - API Routes Diagnosis</title>', '</head> <body data-astro-cid-6tqurwfq> <div class="container" data-astro-cid-6tqurwfq> <h1 data-astro-cid-6tqurwfq>\u{1F50D} Debug Test - API Routes Diagnosis</h1> <p data-astro-cid-6tqurwfq><strong data-astro-cid-6tqurwfq>Purpose:</strong> Find root cause of API routes returning 404 errors</p> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>\u{1F4CA} Initial Server Status</h3> <div id="server-status" data-astro-cid-6tqurwfq>Loading server status...</div> <button id="reload-server-btn" data-astro-cid-6tqurwfq>\u{1F504} Reload Server Status</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>\u{1F527} Environment Variables Test</h3> <div id="env-test" data-astro-cid-6tqurwfq>Not tested yet</div> <button id="test-env-btn" data-astro-cid-6tqurwfq>\u{1F30D} Test Environment Variables</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>\u{1F310} API Endpoints Test</h3> <div id="api-test" data-astro-cid-6tqurwfq>Not tested yet</div> <button id="test-api-auth-btn" data-astro-cid-6tqurwfq>\u{1F517} Test /api/auth</button> <button id="test-api-register-btn" data-astro-cid-6tqurwfq>\u{1F517} Test /api/auth/register</button> <button id="test-api-testauth-btn" data-astro-cid-6tqurwfq>\u{1F517} Test /api/test-auth</button> <button id="test-api-env-btn" data-astro-cid-6tqurwfq>\u{1F517} Test /api/check-env</button> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>\u{1F4CB} All API Tests</h3> <button id="test-all-apis-btn" data-astro-cid-6tqurwfq>\u{1F680} Run All API Tests</button> <div id="all-api-results" data-astro-cid-6tqurwfq></div> </div> <div class="test-section" data-astro-cid-6tqurwfq> <h3 data-astro-cid-6tqurwfq>\u{1F3AF} Diagnosis Summary</h3> <div id="diagnosis" data-astro-cid-6tqurwfq>Run tests above to see diagnosis</div> </div> </div> <script>(function(){', "\n        // Inject server-side data directly as JavaScript object\n        window.debugData = debugData;\n    })();<\/script> ", " </body> </html>"])), renderHead(), defineScriptVars({ debugData: Astro2.props.debugData }), renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/debug.astro?astro&type=script&index=0&lang.ts"));
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
