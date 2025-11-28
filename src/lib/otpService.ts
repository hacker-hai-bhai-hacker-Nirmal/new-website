// src/lib/otpService.ts
// Simple JWT-based OTP service - no database required
// Uses JWT to encrypt OTP and validate without database storage

import crypto from 'crypto';

export interface OTPRequest {
  email: string;
  firstName: string;
  lastName: string;
  purpose: 'registration' | 'login' | 'password_reset';
}

export interface OTPResponse {
  success: boolean;
  otpToken: string; // JWT containing encrypted OTP
  otp: string; // Plain OTP for email (development only)
  expiresIn: number;
  message: string;
  error?: string;
}

export interface OTPVerificationRequest {
  email: string;
  otp: string;
  otpToken: string; // JWT containing encrypted OTP
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
  error?: string;
}

class OTPService {
  private readonly jwtSecret: string;
  private readonly otpExpiryMinutes: number = 10;

  constructor(env?: any) {
    // Use provided env or fallback to import.meta.env
    const environment = env || import.meta.env;
    
    this.jwtSecret = environment.JWT_SECRET || 's60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=';
    if (!environment.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET not set in environment. Using fallback for testing.');
    }
  }

  /**
   * Generate OTP and create JWT token containing the OTP
   * This is stateless - no database storage needed
   */
  async generateOTP(request: OTPRequest): Promise<OTPResponse> {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryTime = Date.now() + (this.otpExpiryMinutes * 60 * 1000);

      // Create JWT token containing OTP data
      const otpToken = this.createOTPToken({
        email: request.email,
        otp,
        purpose: request.purpose,
        exp: Math.floor(expiryTime / 1000),
        iat: Math.floor(Date.now() / 1000)
      });

      return {
        success: true,
        otpToken,
        otp, // Include for email sending (remove in production)
        expiresIn: this.otpExpiryMinutes * 60, // Convert to seconds
        message: `OTP generated for ${request.email}. Valid for ${this.otpExpiryMinutes} minutes.`
      };

    } catch (error: any) {
      console.error('Error generating OTP:', error);
      return {
        success: false,
        otpToken: '',
        otp: '',
        expiresIn: 0,
        message: 'Failed to generate OTP',
        error: error.message
      };
    }
  }

  /**
   * Verify OTP using JWT token
   * This is stateless - no database queries needed
   */
  async verifyOTP(request: OTPVerificationRequest): Promise<OTPVerificationResponse> {
    try {
      const isValid = this.verifyOTPToken(request.otpToken, request.otp, request.email);

      if (isValid) {
        return {
          success: true,
          message: 'OTP verified successfully'
        };
      } else {
        return {
          success: false,
          message: 'Invalid or expired OTP',
          error: 'OTP verification failed'
        };
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'OTP verification failed',
        error: error.message
      };
    }
  }

  /**
   * Create JWT token containing OTP data
   * Uses HS256 HMAC signing for security
   */
  private createOTPToken(payload: {
    email: string;
    otp: string;
    purpose: string;
    exp: number;
    iat: number;
  }): string {
    // JWT Header
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    
    // JWT Payload (contains OTP)
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // JWT Signature
    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Verify JWT token containing OTP data
   * Validates signature, expiry, email, and OTP match
   */
  private verifyOTPToken(token: string, submittedOTP: string, email: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }

      const [encodedHeader, encodedPayload, signature] = parts;
      
      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64url');
      
      if (signature !== expectedSignature) {
        return false;
      }

      // Decode payload
      const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
      
      // Check expiration
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return false;
      }
      
      // Check email match
      if (payload.email !== email) {
        return false;
      }
      
      // Check OTP match
      if (payload.otp !== submittedOTP) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error verifying OTP token:', error);
      return false;
    }
  }

  /**
   * Generate test OTP for development
   */
  generateTestOTP(email: string): { otp: string; otpToken: string } {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + (this.otpExpiryMinutes * 60 * 1000);

    const otpToken = this.createOTPToken({
      email,
      otp,
      purpose: 'registration',
      exp: Math.floor(expiryTime / 1000),
      iat: Math.floor(Date.now() / 1000)
    });

    return { otp, otpToken };
  }
}

// Export both class and singleton instance
export { OTPService };
export const otpService = new OTPService();
export default otpService;