globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_DaomeaOp.mjs';
import { $ as $$Layout } from '../chunks/Layout_CM4pYrUl.mjs';
export { renderers } from '../renderers.mjs';

const $$LoginTest = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login Test" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div style="padding: 20px; font-family: Arial, sans-serif;"> <h1>Login Test - Minimal JavaScript</h1> <button onclick="console.log('Test clicked!'); alert('JavaScript works!');" style="padding: 10px; background: red; color: white; border: none;">
🧪 Test JavaScript
</button> <form id="testForm" style="margin-top: 20px;"> <input type="email" id="email" placeholder="Email" style="padding: 10px; margin: 5px; border: 1px solid #ccc;"> <br> <input type="password" id="password" placeholder="Password" style="padding: 10px; margin: 5px; border: 1px solid #ccc;"> <br> <button type="submit" style="padding: 10px; background: #007bff; color: white; border: none;">
Test Login
</button> </form> <div id="output" style="margin-top: 20px; padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6;"> <p>Output will appear here...</p> </div> </div> </main> ${renderScript($$result2, "C:/Users/nirma/Desktop/New Website/src/pages/login-test.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/login-test.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/login-test.astro";
const $$url = "/login-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LoginTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
