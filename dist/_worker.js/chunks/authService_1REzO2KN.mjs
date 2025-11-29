globalThis.process ??= {}; globalThis.process.env ??= {};
import crypto from 'crypto';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true, "VITE_APPWRITE_API_KEY": "standard_2ea684a82e7b55511b056b2857a03bdc93996b398ad9214410aa6e0faed1bc6ebeb03138858213a9f51e1433c4cddc9908821350bf826103f9b26389e315801beb75c5104ef4bd2490b0565a8ff4b0bf4e3907f525114172f8e6e398aa5d24f924dc5b0c467f4885a38aa3b42c4d7c0262cdf8c9f38111772075e021c5359c75", "VITE_APPWRITE_COLLECTION_MENU": "menu_items", "VITE_APPWRITE_COLLECTION_ORDERS": "orders", "VITE_APPWRITE_COLLECTION_USERS": "users", "VITE_APPWRITE_DATABASE_ID": "main-db", "VITE_APPWRITE_ENDPOINT": "https://fra.cloud.appwrite.io/v1", "VITE_APPWRITE_PROJECT_ID": "6900b1ed001604d8befb", "VITE_FRONTEND_URL": "http://localhost:3000", "VITE_USER_NODE_ENV": "development"};
const ROLE_PERMISSIONS = {
  customer: [
    "/dashboard",
    "/checkout",
    "/rewards",
    "/menu",
    "/profile"
  ],
  delivery_partner: [
    "/dashboard",
    "/delivery",
    "/kitchen",
    "/profile"
  ],
  restaurant_staff: [
    "/dashboard",
    "/kitchen",
    "/menu",
    "/orders",
    "/profile"
  ],
  admin: [
    "/dashboard",
    "/admin",
    "/kitchen",
    "/menu",
    "/orders",
    "/delivery",
    "/users",
    "/settings",
    "/profile"
  ]
};
const PROTECTED_ROUTES = [
  "/dashboard",
  "/checkout",
  "/rewards",
  "/admin",
  "/kitchen",
  "/delivery",
  "/menu",
  "/orders",
  "/users",
  "/settings",
  "/profile"
];
class AuthService {
  jwtSecret;
  tokenExpiryHours = 24;
  refreshTokenExpiryDays = 7;
  constructor(env) {
    const environment = env || Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=" });
    this.jwtSecret = environment.JWT_SECRET || "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=";
    if (!environment.JWT_SECRET) {
      console.warn("WARNING: JWT_SECRET not set in environment. Using fallback for testing.");
    }
  }
  /**
   * Create JWT token for user authentication
   */
  createToken(payload, expiresInHours = this.tokenExpiryHours) {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
    const now = Math.floor(Date.now() / 1e3);
    const exp = now + expiresInHours * 3600;
    const tokenPayload = {
      ...payload,
      exp,
      iat: now
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
    const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString("base64url");
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac("sha256", this.jwtSecret).update(signatureInput).digest("base64url");
    return `${signatureInput}.${signature}`;
  }
  /**
   * Verify and decode JWT token
   */
  verifyToken(token) {
    try {
      const [encodedHeader, encodedPayload, signature] = token.split(".");
      if (!encodedHeader || !encodedPayload || !signature) {
        return null;
      }
      const signatureInput = `${encodedHeader}.${encodedPayload}`;
      const expectedSignature = crypto.createHmac("sha256", this.jwtSecret).update(signatureInput).digest("base64url");
      if (signature !== expectedSignature) {
        return null;
      }
      const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1e3)) {
        return null;
      }
      return payload;
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  }
  /**
   * Generate user ID
   */
  generateUserId() {
    return crypto.randomUUID();
  }
  /**
   * Create mock user for development (in production, this would save to database)
   */
  createMockUser(request) {
    return {
      id: this.generateUserId(),
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      role: request.role,
      restaurantId: request.restaurantId,
      phone: request.phone,
      isActive: true,
      createdAt: Date.now()
    };
  }
  /**
   * Register new user with role
   */
  async register(request) {
    try {
      if (request.role === "restaurant_staff" && !request.restaurantId) {
        return {
          success: false,
          error: "Restaurant ID is required for restaurant staff role"
        };
      }
      const user = this.createMockUser(request);
      const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
      const expiryTime = Date.now() + 10 * 60 * 1e3;
      const otpToken = this.createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId
      }, 10 / 60);
      return {
        success: true,
        user,
        otpToken,
        otp,
        // Include for development (remove in production)
        message: `Registration successful! Please verify your email with OTP: ${otp}`
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "Registration failed. Please try again."
      };
    }
  }
  /**
   * Verify OTP and complete registration/login
   */
  async verifyOTP(email, otp, otpToken) {
    try {
      const tokenData = this.verifyToken(otpToken);
      if (!tokenData) {
        return {
          success: false,
          error: "Invalid or expired OTP token"
        };
      }
      if (tokenData.email !== email) {
        return {
          success: false,
          error: "Email mismatch"
        };
      }
      if (!/^\d{6}$/.test(otp)) {
        return {
          success: false,
          error: "Invalid OTP format"
        };
      }
      const user = {
        id: tokenData.userId,
        email: tokenData.email,
        firstName: "User",
        // In production, fetch from database
        lastName: "Name",
        role: tokenData.role,
        restaurantId: tokenData.restaurantId,
        isActive: true,
        createdAt: Date.now()
      };
      const accessToken = this.createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId
      });
      const refreshToken = this.createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId
      }, this.refreshTokenExpiryDays * 24);
      return {
        success: true,
        user,
        accessToken,
        refreshToken,
        expiresIn: this.tokenExpiryHours * 3600,
        // Convert to seconds
        message: "Authentication successful!"
      };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        error: "OTP verification failed"
      };
    }
  }
  /**
   * Refresh access token
   */
  async refreshToken(refreshToken) {
    try {
      const tokenData = this.verifyToken(refreshToken);
      if (!tokenData) {
        return {
          success: false,
          error: "Invalid or expired refresh token"
        };
      }
      const newAccessToken = this.createToken({
        userId: tokenData.userId,
        email: tokenData.email,
        role: tokenData.role,
        restaurantId: tokenData.restaurantId
      });
      return {
        success: true,
        accessToken: newAccessToken,
        expiresIn: this.tokenExpiryHours * 3600,
        message: "Token refreshed successfully"
      };
    } catch (error) {
      console.error("Token refresh error:", error);
      return {
        success: false,
        error: "Token refresh failed"
      };
    }
  }
  /**
   * Get user from token
   */
  async getUserFromToken(token) {
    try {
      const tokenData = this.verifyToken(token);
      if (!tokenData) {
        return null;
      }
      return {
        id: tokenData.userId,
        email: tokenData.email,
        firstName: "User",
        lastName: "Name",
        role: tokenData.role,
        restaurantId: tokenData.restaurantId,
        isActive: true,
        createdAt: Date.now()
      };
    } catch (error) {
      console.error("Get user from token error:", error);
      return null;
    }
  }
  /**
   * Check if user has permission for route
   */
  hasRoutePermission(user, pathname) {
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.some((route) => pathname.startsWith(route));
  }
  /**
   * Check if route requires authentication
   */
  isProtectedRoute(pathname) {
    return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  }
}
new AuthService();

export { AuthService as A, ROLE_PERMISSIONS as R };
