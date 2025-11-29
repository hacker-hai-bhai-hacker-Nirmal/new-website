globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_OziQ-2Q1.mjs';
import { $ as $$Layout } from '../chunks/Layout_CpB4Q-X3.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$OtpLogin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OtpLogin;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login with OTP | Litterateur", "data-astro-cid-uv6iuh3x": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="otp-login-container" data-astro-cid-uv6iuh3x> <div class="login-card" data-astro-cid-uv6iuh3x> <div class="login-header" data-astro-cid-uv6iuh3x> <div class="logo" data-astro-cid-uv6iuh3x> <h1 data-astro-cid-uv6iuh3x>Litterateur</h1> <p data-astro-cid-uv6iuh3x>Where Culinary Art Meets Literary Excellence</p> </div> <h2 data-astro-cid-uv6iuh3x>Welcome Back!</h2> <p data-astro-cid-uv6iuh3x>Sign in with your email to continue</p> </div> <div class="login-form" data-astro-cid-uv6iuh3x> <!-- Step 1: Email Input --> <div id="emailStep" class="form-step active" data-astro-cid-uv6iuh3x> <form id="emailForm" data-astro-cid-uv6iuh3x> <div class="form-group" data-astro-cid-uv6iuh3x> <label for="email" data-astro-cid-uv6iuh3x>Email Address</label> <input type="email" id="email" name="email" placeholder="Enter your email address" required data-astro-cid-uv6iuh3x> <small data-astro-cid-uv6iuh3x>We'll send a verification code to this email</small> </div> <button type="submit" class="primary-btn" id="sendOtpBtn" data-astro-cid-uv6iuh3x>
Send Verification Code
</button> </form> </div> <!-- Step 2: OTP Input --> <div id="otpStep" class="form-step" data-astro-cid-uv6iuh3x> <form id="otpForm" data-astro-cid-uv6iuh3x> <div class="form-group" data-astro-cid-uv6iuh3x> <label for="otp" data-astro-cid-uv6iuh3x>Verification Code</label> <div class="otp-input-container" data-astro-cid-uv6iuh3x> <input type="text" id="otp" name="otp" placeholder="Enter 6-digit code" maxlength="6" pattern="[0-9]{6}" required data-astro-cid-uv6iuh3x> </div> <small data-astro-cid-uv6iuh3x>Check your email for the 6-digit verification code</small> </div> <div class="form-actions" data-astro-cid-uv6iuh3x> <button type="submit" class="primary-btn" id="verifyOtpBtn" data-astro-cid-uv6iuh3x>
Verify & Sign In
</button> <button type="button" class="secondary-btn" id="resendOtpBtn" data-astro-cid-uv6iuh3x>
Resend Code
</button> </div> </form> </div> <!-- Step 3: Success --> <div id="successStep" class="form-step" data-astro-cid-uv6iuh3x> <div class="success-content" data-astro-cid-uv6iuh3x> <div class="success-icon" data-astro-cid-uv6iuh3x>✓</div> <h3 data-astro-cid-uv6iuh3x>Login Successful!</h3> <p data-astro-cid-uv6iuh3x>Redirecting to your dashboard...</p> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/nirma/Desktop/New Website/src/pages/otp-login.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/nirma/Desktop/New Website/src/pages/otp-login.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/otp-login.astro";
const $$url = "/otp-login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OtpLogin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
