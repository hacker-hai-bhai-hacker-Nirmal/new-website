globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../chunks/astro_D7NO5LnA.mjs';
export { e as renderers } from '../chunks/astro_D7NO5LnA.mjs';
import '../chunks/piccolore_BYG8EtZb.mjs';
import { $ as $$Layout } from '../chunks/Layout_MWRqmE_e.mjs';

const $$TestSimple = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Simple JavaScript Test" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div style="padding: 20px; font-family: Arial, sans-serif;"> <h1>Simple JavaScript Test</h1> <p>Test basic JavaScript functionality:</p> <button onclick="alert('Inline onclick works!')" style="padding: 10px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 5px;">
Test 1: Inline Alert
</button> <button onclick="console.log('Console log works!'); this.textContent='Clicked!'" style="padding: 10px; margin: 5px; background: #28a745; color: white; border: none; border-radius: 5px;">
Test 2: Console Log
</button> <button id="test3" style="padding: 10px; margin: 5px; background: #ffc107; color: black; border: none; border-radius: 5px;">
Test 3: Event Listener
</button> <div id="output" style="margin-top: 20px; padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;"> <p>Output will appear here...</p> </div> </div> </main> ${renderScript($$result2, "C:/Users/nirma/Desktop/New Website/src/pages/test-simple.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/test-simple.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/test-simple.astro";
const $$url = "/test-simple";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestSimple,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
