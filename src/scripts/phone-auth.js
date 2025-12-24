import { auth, db, getAuth, signInWithPhoneNumber, RecaptchaVerifier, doc, getDoc, setDoc } from "../utils/firebase.js";

let confirmationResult = null;

window.addEventListener('DOMContentLoaded', () => {
  // Setup reCAPTCHA
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved
    }
  }, auth);

  document.getElementById('sendOtpBtn').onclick = async () => {
    const phoneInput = document.getElementById('phoneNumber');
    const phone = phoneInput.value;
    const errorDiv = document.getElementById('phoneError');
    errorDiv.textContent = "";
    if (!phone) {
      errorDiv.textContent = "Please enter a valid phone number.";
      return;
    }
    try {
      confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      document.getElementById('otpSection').style.display = 'block';
      errorDiv.textContent = "OTP sent! Please check your phone.";
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  };

  document.getElementById('verifyOtpBtn').onclick = async () => {
    const otpInput = document.getElementById('otpCode');
    const otp = otpInput.value;
    const errorDiv = document.getElementById('phoneError');
    errorDiv.textContent = "";
    if (!otp || !confirmationResult) {
      errorDiv.textContent = "Please enter the OTP sent to your phone.";
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      // Create user doc if not exists
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          phone: user.phoneNumber,
          role: "customer",
          createdAt: new Date().toISOString()
        });
      }
      // Redirect based on role
      const role = userDoc.exists() ? userDoc.data().role : "customer";
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  };
});
