globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

async function GET({ locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const results = {
      pattern: "Astro.locals.runtime.env",
      available: false,
      vars: {},
      runtimeEnvType: typeof runtimeEnv,
      runtimeEnvKeys: runtimeEnv ? Object.keys(runtimeEnv) : []
    };
    if (runtimeEnv) {
      const vars = {};
      const variableNames = ["brevo_MCP_key", "JWT_SECRET", "APPWRITE_PROJECT_ID", "APPWRITE_ENDPOINT", "APPWRITE_DATABASE_ID"];
      for (const key of variableNames) {
        vars[key] = runtimeEnv[key];
      }
      results.vars = vars;
      results.available = Object.keys(vars).filter((key) => vars[key] !== void 0).length > 0;
    }
    return Response.json({
      success: true,
      message: "Test correct Cloudflare Pages environment variable pattern",
      results,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error?.message || String(error),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
