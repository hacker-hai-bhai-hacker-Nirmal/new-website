globalThis.process ??= {}; globalThis.process.env ??= {};
import crypto from 'crypto';

class OTPService {
  jwtSecret;
  otpExpiryMinutes = 10;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "fallback-secret-change-in-production";
    if (this.jwtSecret === "fallback-secret-change-in-production") {
      console.warn("WARNING: Using fallback JWT secret. Please set JWT_SECRET environment variable.");
    }
  }
  /**
   * Generate OTP and create JWT token containing the OTP
   * This is stateless - no database storage needed
   */
  async generateOTP(request) {
    try {
      const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
      const expiryTime = Date.now() + this.otpExpiryMinutes * 60 * 1e3;
      const otpToken = this.createOTPToken({
        email: request.email,
        otp,
        purpose: request.purpose,
        exp: Math.floor(expiryTime / 1e3),
        iat: Math.floor(Date.now() / 1e3)
      });
      return {
        success: true,
        otpToken,
        otp,
        // Include for email sending (remove in production)
        expiresIn: this.otpExpiryMinutes * 60,
        // Convert to seconds
        message: `OTP generated for ${request.email}. Valid for ${this.otpExpiryMinutes} minutes.`
      };
    } catch (error) {
      console.error("Error generating OTP:", error);
      return {
        success: false,
        otpToken: "",
        otp: "",
        expiresIn: 0,
        message: "Failed to generate OTP",
        error: error.message
      };
    }
  }
  /**
   * Verify OTP using JWT token
   * This is stateless - no database queries needed
   */
  async verifyOTP(request) {
    try {
      const isValid = this.verifyOTPToken(request.otpToken, request.otp, request.email);
      if (isValid) {
        return {
          success: true,
          message: "OTP verified successfully"
        };
      } else {
        return {
          success: false,
          message: "Invalid or expired OTP",
          error: "OTP verification failed"
        };
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return {
        success: false,
        message: "OTP verification failed",
        error: error.message
      };
    }
  }
  /**
   * Create JWT token containing OTP data
   * Uses HS256 HMAC signing for security
   */
  createOTPToken(payload) {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto.createHmac("sha256", this.jwtSecret).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  /**
   * Verify JWT token containing OTP data
   * Validates signature, expiry, email, and OTP match
   */
  verifyOTPToken(token, submittedOTP, email) {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return false;
      }
      const [encodedHeader, encodedPayload, signature] = token;
      const expectedSignature = crypto.createHmac("sha256", this.jwtSecret).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");
      if (signature !== expectedSignature) {
        return false;
      }
      const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1e3)) {
        return false;
      }
      if (payload.email !== email) {
        return false;
      }
      if (payload.otp !== submittedOTP) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error verifying OTP token:", error);
      return false;
    }
  }
  /**
   * Generate test OTP for development
   */
  generateTestOTP(email) {
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    const expiryTime = Date.now() + this.otpExpiryMinutes * 60 * 1e3;
    const otpToken = this.createOTPToken({
      email,
      otp,
      purpose: "registration",
      exp: Math.floor(expiryTime / 1e3),
      iat: Math.floor(Date.now() / 1e3)
    });
    return { otp, otpToken };
  }
}
const otpService = new OTPService();

export { otpService as o };
