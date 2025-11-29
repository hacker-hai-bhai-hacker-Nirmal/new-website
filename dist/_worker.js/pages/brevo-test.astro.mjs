globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_OziQ-2Q1.mjs';
import { $ as $$Layout } from '../chunks/Layout_CpB4Q-X3.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$BrevoTest = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Brevo API Test | Litterateur", "data-astro-cid-uf7osmhh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="brevo-test-container" data-astro-cid-uf7osmhh> <div class="test-header" data-astro-cid-uf7osmhh> <h1 data-astro-cid-uf7osmhh>🚀 Brevo API Test - Simple & Direct</h1> <p data-astro-cid-uf7osmhh>Click the button to send a test email and see detailed logs at every layer</p> </div> <div class="test-section" data-astro-cid-uf7osmhh> <button id="sendTestEmail" class="test-button" data-astro-cid-uf7osmhh>
🧪 Test Environment Variables
</button> <div id="testStatus" class="test-status" data-astro-cid-uf7osmhh>
Ready to test...
</div> </div> <div class="logs-section" data-astro-cid-uf7osmhh> <h2 data-astro-cid-uf7osmhh>🔍 Detailed Layer-by-Layer Logs</h2> <div id="logsContainer" class="logs-container" data-astro-cid-uf7osmhh> <div class="log-entry log-info" data-astro-cid-uf7osmhh> <span class="log-time" data-astro-cid-uf7osmhh>[Ready]</span> <span class="log-layer" data-astro-cid-uf7osmhh>INIT</span> <span class="log-message" data-astro-cid-uf7osmhh>Test page loaded, waiting for user action...</span> </div> </div> </div> </div>  ` })} ${renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/brevo-test.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/brevo-test.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/brevo-test.astro";
const $$url = "/brevo-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BrevoTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
