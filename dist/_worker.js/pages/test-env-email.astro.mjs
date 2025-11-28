globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_DaomeaOp.mjs';
import { $ as $$Layout } from '../chunks/Layout_D7NlRXD9.mjs';
export { renderers } from '../renderers.mjs';

const $$TestEnvEmail = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Environment Variable Email Test" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main style="max-width: 600px; margin: 50px auto; padding: 20px;"> <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"> <h1 style="color: #2ecc71;">🌿 Litterateur Environment Variable Test</h1> <p>This page tests your email system using the <strong>same environment variable method</strong> as your login page.</p> <div style="background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>⚠️ Important:</strong> This test uses the <strong>brevo_MCP_key environment variable</strong> - the same method as your login page. If this fails, it confirms the environment variable issue in Cloudflare Pages.
</div> <button id="testBtn" onclick="testEmail()" style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px;">
🧪 Test Environment Variable Email
</button> <div id="status"></div> <div id="otpResult"></div> <div style="background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0;"> <h3>📋 What This Tests:</h3> <ul> <li>✅ Environment variable brevo_MCP_key accessibility</li> <li>✅ Brevo email sending via environment variable</li> <li>✅ Gmail sender verification</li> <li>✅ Email template rendering</li> <li>🔧 Same method as login page</li> </ul> <h3>📧 What You Should Receive:</h3> <ul> <li>Subject: "🧪 Environment Variable Test - OTP: [6-digit code]"</li> <li>From: nirmalbajiya@gmail.com</li> <li>Professional Litterateur branding</li> </ul> <h3>🔍 Expected Results:</h3> <ul> <li><strong>If Success:</strong> Environment variable is working, login page should work too!</li> <li><strong>If Failure:</strong> Confirms environment variable needs to be set in Cloudflare Pages</li> </ul> </div> </div> </main> ${renderScript($$result2, "C:/Users/nirma/Desktop/New Website/src/pages/test-env-email.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/nirma/Desktop/New Website/src/pages/test-env-email.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/test-env-email.astro";
const $$url = "/test-env-email";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestEnvEmail,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
