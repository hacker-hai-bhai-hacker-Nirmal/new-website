globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C-K2zirC.mjs';
import { $ as $$Layout } from '../chunks/Layout_DVntI8GC.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <script type="module">
  // Simple standalone login functionality
  console.log('\u{1F680} Login script loaded!');
  
  // Wait for DOM to be ready - ONLY ONCE
  document.addEventListener('DOMContentLoaded', () => {
    console.log('\u{1F4C4} DOM Content Loaded');
    
    // Test basic functionality
    const testBtn = document.querySelector('button[onclick*="Test JavaScript"]');
    if (testBtn) {
      console.log('\u2705 Test button found');
    } else {
      console.log('\u274C Test button not found');
    }
    
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleToSignup = document.getElementById('toggleToSignup');
    const toggleToLogin = document.getElementById('toggleToLogin');
    
    console.log('\u{1F4C4} Setting up form handlers...');
    
    // Form switching handlers
    if (toggleToSignup) {
      toggleToSignup.addEventListener('click', (e) => {
        console.log('\u{1F504} Switching to signup');
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
      });
    }

    if (toggleToLogin) {
      toggleToLogin.addEventListener('click', (e) => {
        console.log('\u{1F504} Switching to login');
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
      });
    }

    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        console.log('\u{1F680} Form submit event triggered!');
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const submitBtn = document.getElementById('loginSubmit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        console.log('\u{1F4DD} Form data:', { email, password: password ? '***' : 'empty' });
        
        // Basic validation
        if (!email || !password) {
          console.log('\u274C Please fill in all fields');
          alert('Please fill in all fields');
          return;
        }
        
        console.log('\u2705 Form validation passed');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        
        console.log('\u23F3 Loading state activated');
        
        try {
          console.log('\u{1F528} Attempting login via API:', { email, password: '***' });
          
          // Use API endpoint for login
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: 'login',
              email,
              password
            })
          });
          
          const result = await response.json();
          
          if (result.success) {
            console.log('\u2705 Login successful:', result.data);
            alert('Login successful! Redirecting to dashboard...');
            
            // Store session info
            localStorage.setItem('userSession', JSON.stringify(result.data));
            localStorage.setItem('userEmail', email);
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
              console.log('\u{1F504} Redirecting to dashboard...');
              window.location.href = '/dashboard';
            }, 1500);
          } else {
            throw new Error(result.error);
          }
          
        } catch (error) {
          console.error('\u274C Login error:', error);
          
          let errorMessage = 'Login failed. Please try again.';
          
          if (error.code === 401 || error.message?.includes('invalid_credentials')) {
            errorMessage = 'Invalid email or password';
          } else if (error.code === 429) {
            errorMessage = 'Too many login attempts. Please try again later';
          } else if (error.message) {
            errorMessage = 'Login failed: ' + error.message;
          }
          
          alert(errorMessage);
        } finally {
          // Reset loading state
          submitBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
        }
      });
    }
    
    // Signup form submission
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        console.log('\u{1F680} Signup form submit event triggered!');
        e.preventDefault();
        
        const fullName = document.getElementById('signupFullName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        console.log('\u{1F4DD} Signup data:', { fullName, email, password: password ? '***' : 'empty', agreeTerms });
        
        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
          console.log('\u274C Please fill in all fields');
          alert('Please fill in all fields');
          return;
        }
        
        if (password !== confirmPassword) {
          console.log('\u274C Passwords do not match');
          alert('Passwords do not match');
          return;
        }
        
        if (!agreeTerms) {
          console.log('\u274C Please agree to terms');
          alert('Please agree to the Terms & Conditions');
          return;
        }
        
        console.log('\u2705 Signup validation passed');
        
        try {
          console.log('\u{1F528} Attempting signup via API:', { fullName, email, password: '***' });
          
          // Use API endpoint for signup
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: 'signup',
              fullName,
              email,
              password
            })
          });
          
          const result = await response.json();
          
          if (result.success) {
            console.log('\u2705 Account created:', result.data);
            alert('Account created successfully! You can now sign in.');
            
            // Switch back to login form
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            
            // Pre-fill email in login form
            document.getElementById('email').value = email;
          } else {
            throw new Error(result.error);
          }
          
        } catch (error) {
          console.error('\u274C Signup error:', error);
          
          let errorMessage = 'Signup failed. Please try again.';
          
          if (error.code === 400) {
            errorMessage = 'Email already exists or invalid data';
          } else if (error.code === 429) {
            errorMessage = 'Too many signup attempts. Please try again later';
          } else if (error.message) {
            errorMessage = 'Signup failed: ' + error.message;
          }
          
          alert(errorMessage);
        }
      });
    }
    
    // Setup password toggles
    function setupPasswordToggle(toggleId, inputId) {
      const toggle = document.getElementById(toggleId);
      const input = document.getElementById(inputId);
      
      if (toggle && input) {
        toggle.addEventListener('click', () => {
          const type = input.type === 'password' ? 'text' : 'password';
          input.type = type;
          toggle.querySelector('.eye-icon').textContent = type === 'password' ? '\u{1F441}\uFE0F' : '\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F';
        });
      }
    }

    setupPasswordToggle('togglePassword', 'password');
    setupPasswordToggle('toggleSignupPassword', 'signupPassword');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
  });
<\/script> `])), renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="discount-banner" data-astro-cid-sgpqyurt> <div class="sparkle-effect" data-astro-cid-sgpqyurt>✨</div> <span data-astro-cid-sgpqyurt>🎉 Launch Discount: Get Up to 60% Off! 🎉</span> <div class="sparkle-effect" data-astro-cid-sgpqyurt>✨</div> </div> <header class="site-header" data-astro-cid-sgpqyurt> <div class="container" data-astro-cid-sgpqyurt> <a class="brand" href="/" data-astro-cid-sgpqyurt> <span class="brand-icon" data-astro-cid-sgpqyurt>📚</span>
Litterateur
</a> <nav class="nav" data-astro-cid-sgpqyurt> <a href="/menu" data-astro-cid-sgpqyurt>Menu</a> <a href="/rewards" data-astro-cid-sgpqyurt>Rewards</a> <a class="cta" href="/login" data-astro-cid-sgpqyurt>Sign In</a> </nav> </div> </header> <main data-astro-cid-sgpqyurt> <section class="auth-section" data-astro-cid-sgpqyurt> <div class="container" data-astro-cid-sgpqyurt> <div class="auth-container" data-astro-cid-sgpqyurt> <div class="auth-image" data-astro-cid-sgpqyurt> <div class="image-content" data-astro-cid-sgpqyurt> <div class="floating-elements" data-astro-cid-sgpqyurt> <div class="float-item coffee" data-astro-cid-sgpqyurt>☕</div> <div class="float-item book" data-astro-cid-sgpqyurt>📖</div> <div class="float-item food" data-astro-cid-sgpqyurt>🍽️</div> </div> <div class="image-text" data-astro-cid-sgpqyurt> <h2 data-astro-cid-sgpqyurt>Literary Dining Experience</h2> <p data-astro-cid-sgpqyurt>Where every meal tells a story</p> </div> </div> </div> <div class="auth-form-container" data-astro-cid-sgpqyurt> <div class="auth-header" data-astro-cid-sgpqyurt> <div class="auth-badge" data-astro-cid-sgpqyurt> <span data-astro-cid-sgpqyurt>🎉 Welcome Back!</span> </div> <h1 data-astro-cid-sgpqyurt>Sign In to Litterateur</h1> <p data-astro-cid-sgpqyurt>Unlock exclusive rewards and personalized offers</p> </div> <!-- Login Form --> <form class="auth-form" id="loginForm" data-astro-cid-sgpqyurt> <div class="form-group" data-astro-cid-sgpqyurt> <label for="email" data-astro-cid-sgpqyurt>Email Address *</label> <div class="input-wrapper" data-astro-cid-sgpqyurt> <input type="email" id="email" name="email" placeholder="john@example.com" required data-astro-cid-sgpqyurt> <span class="input-icon" data-astro-cid-sgpqyurt>📧</span> </div> <span class="error-message" id="emailError" data-astro-cid-sgpqyurt>Please enter a valid email</span> </div> <div class="form-group" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Password *</label> <div class="input-wrapper" data-astro-cid-sgpqyurt> <input type="password" id="password" name="password" placeholder="Enter your password" required data-astro-cid-sgpqyurt> <button type="button" class="toggle-password" id="togglePassword" data-astro-cid-sgpqyurt> <span class="eye-icon" data-astro-cid-sgpqyurt>👁️</span> </button> </div> <span class="error-message" id="passwordError" data-astro-cid-sgpqyurt>Password must be at least 6 characters</span> </div> <div class="form-group checkbox-group" data-astro-cid-sgpqyurt> <label class="checkbox-label" data-astro-cid-sgpqyurt> <input type="checkbox" id="rememberMe" name="rememberMe" data-astro-cid-sgpqyurt> <span class="checkmark" data-astro-cid-sgpqyurt></span>
Remember Me
</label> </div> <button type="submit" class="auth-submit" id="loginSubmit" data-astro-cid-sgpqyurt> <span class="btn-text" data-astro-cid-sgpqyurt>Sign In</span> <span class="btn-loader" style="display: none;" data-astro-cid-sgpqyurt>⏳</span> </button> <!-- Test button for debugging --> <button type="button" onclick="console.log('🧪 Test button clicked!')" style="margin-top: 10px; padding: 10px; background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer;" data-astro-cid-sgpqyurt>
🧪 Test JavaScript
</button> <div class="social-login" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>Or continue with</p> <div class="social-buttons" data-astro-cid-sgpqyurt> <button type="button" class="social-btn google" id="googleLogin" data-astro-cid-sgpqyurt> <span class="social-icon" data-astro-cid-sgpqyurt>🔍</span>
Google
</button> <button type="button" class="social-btn phone" id="phoneLogin" data-astro-cid-sgpqyurt> <span class="social-icon" data-astro-cid-sgpqyurt>📱</span>
Phone OTP
</button> </div> </div> <div class="auth-links" data-astro-cid-sgpqyurt> <a href="#" class="forgot-password" data-astro-cid-sgpqyurt>Forgot Password?</a> <span class="divider" data-astro-cid-sgpqyurt>|</span> <a href="#" class="toggle-auth" id="toggleToSignup" data-astro-cid-sgpqyurt>New User? Sign Up</a> </div> </form> <!-- Signup Form (Hidden by default) --> <form class="auth-form" id="signupForm" style="display: none;" data-astro-cid-sgpqyurt> <div class="form-group" data-astro-cid-sgpqyurt> <label for="signupFullName" data-astro-cid-sgpqyurt>Full Name *</label> <input type="text" id="signupFullName" name="signupFullName" placeholder="John Doe" required data-astro-cid-sgpqyurt> </div> <div class="form-group" data-astro-cid-sgpqyurt> <label for="signupEmail" data-astro-cid-sgpqyurt>Email Address *</label> <input type="email" id="signupEmail" name="signupEmail" placeholder="john@example.com" required data-astro-cid-sgpqyurt> <span class="error-message" id="signupEmailError" data-astro-cid-sgpqyurt>Please enter a valid email</span> </div> <div class="form-group" data-astro-cid-sgpqyurt> <label for="signupPassword" data-astro-cid-sgpqyurt>Password *</label> <div class="password-input-group" data-astro-cid-sgpqyurt> <input type="password" id="signupPassword" name="signupPassword" placeholder="Create a password" required data-astro-cid-sgpqyurt> <button type="button" class="toggle-password" id="toggleSignupPassword" data-astro-cid-sgpqyurt> <span class="eye-icon" data-astro-cid-sgpqyurt>👁️</span> </button> </div> </div> <div class="form-group" data-astro-cid-sgpqyurt> <label for="confirmPassword" data-astro-cid-sgpqyurt>Confirm Password *</label> <div class="password-input-group" data-astro-cid-sgpqyurt> <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required data-astro-cid-sgpqyurt> <button type="button" class="toggle-password" id="toggleConfirmPassword" data-astro-cid-sgpqyurt> <span class="eye-icon" data-astro-cid-sgpqyurt>👁️</span> </button> </div> </div> <div class="form-group checkbox-group" data-astro-cid-sgpqyurt> <label class="checkbox-label" data-astro-cid-sgpqyurt> <input type="checkbox" id="agreeTerms" name="agreeTerms" required data-astro-cid-sgpqyurt> <span class="checkmark" data-astro-cid-sgpqyurt></span>
I agree to the Terms & Conditions
</label> </div> <button type="submit" class="auth-submit" data-astro-cid-sgpqyurt>Sign Up</button> <div class="auth-links" data-astro-cid-sgpqyurt> <a href="#" class="toggle-auth" id="toggleToLogin" data-astro-cid-sgpqyurt>Already have an account? Sign In</a> </div> </form> <!-- Trust Badges --> <div class="trust-badges" data-astro-cid-sgpqyurt> <div class="trust-badge" data-astro-cid-sgpqyurt> <span class="trust-icon" data-astro-cid-sgpqyurt>🔒</span> <span data-astro-cid-sgpqyurt>Secure Login</span> </div> <div class="trust-badge" data-astro-cid-sgpqyurt> <span class="trust-icon" data-astro-cid-sgpqyurt>🛡️</span> <span data-astro-cid-sgpqyurt>Your data is safe with us</span> </div> </div> </div> </div> </div> </section> </main> ` }));
}, "C:/Users/nirma/Desktop/New Website/src/pages/login.astro", void 0);

const $$file = "C:/Users/nirma/Desktop/New Website/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
