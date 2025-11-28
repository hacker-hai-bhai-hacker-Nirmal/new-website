globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DaomeaOp.mjs';
import { $ as $$Layout } from '../chunks/Layout_CM4pYrUl.mjs';
import { a as account } from '../chunks/appwrite_CaeG9vcz.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$VerifyOtp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VerifyOtp;
  const url = new URL(Astro2.request.url);
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");
  let verificationStatus = "verifying";
  let errorMessage = "";
  if (userId && secret) {
    try {
      const session = await account.createSession(userId, secret);
      verificationStatus = "success";
      Astro2.cookies.set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 60 * 60 * 24 * 30
        // 30 days
      });
    } catch (error) {
      console.error("Verification error:", error);
      verificationStatus = "error";
      errorMessage = error.message || "Failed to verify OTP";
    }
  } else {
    verificationStatus = "error";
    errorMessage = "Invalid verification link";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Verify OTP | Litterateur", "data-astro-cid-fhdprs2w": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="verification-container" data-astro-cid-fhdprs2w> <div class="verification-card" data-astro-cid-fhdprs2w> ${verificationStatus === "verifying" && renderTemplate`<div class="verification-status" data-astro-cid-fhdprs2w> <div class="spinner" data-astro-cid-fhdprs2w></div> <h2 data-astro-cid-fhdprs2w>Verifying your email...</h2> <p data-astro-cid-fhdprs2w>Please wait while we verify your email address.</p> </div>`} ${verificationStatus === "success" && renderTemplate`<div class="verification-status success" data-astro-cid-fhdprs2w> <div class="icon" data-astro-cid-fhdprs2w>✓</div> <h2 data-astro-cid-fhdprs2w>Email Verified!</h2> <p data-astro-cid-fhdprs2w>Your email has been successfully verified. Redirecting you to your dashboard...</p> <a href="/dashboard" class="btn primary" data-astro-cid-fhdprs2w>Go to Dashboard</a> </div>`} ${verificationStatus === "error" && renderTemplate`<div class="verification-status error" data-astro-cid-fhdprs2w> <div class="icon" data-astro-cid-fhdprs2w>✕</div> <h2 data-astro-cid-fhdprs2w>Verification Failed</h2> <p data-astro-cid-fhdprs2w>${errorMessage || "An error occurred during verification."}</p> <a href="/otp-login" class="btn secondary" data-astro-cid-fhdprs2w>Back to Login</a> </div>`} </div> </div> ` })} ${renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/verify-otp.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/nirma/Desktop/New Website/src/pages/verify-otp.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/verify-otp.astro";
const $$url = "/verify-otp";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VerifyOtp,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
