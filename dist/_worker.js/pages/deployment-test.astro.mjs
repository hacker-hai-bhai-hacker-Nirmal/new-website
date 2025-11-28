globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DaomeaOp.mjs';
import { $ as $$Layout } from '../chunks/Layout_D7NlRXD9.mjs';
export { renderers } from '../renderers.mjs';

const $$DeploymentTest = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Deployment Test | Litterateur" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="padding: 2rem; text-align: center;"> <h1>🚀 Deployment Test Page</h1> <p><strong>Status:</strong> <span id="status">Loading...</span></p> <p><strong>Deployed at:</strong> <span id="deployTime"></span></p> <p><strong>Environment:</strong> <span id="environment"></span></p> <div style="margin-top: 2rem;"> <h2>API Test Results</h2> <div id="apiResults">Testing APIs...</div> </div> </div> ` })} ${renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/deployment-test.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/deployment-test.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/deployment-test.astro";
const $$url = "/deployment-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DeploymentTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
