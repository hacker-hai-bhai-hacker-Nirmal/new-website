// Enhanced Role-Based Authentication Service
// Supports JWT tokens with role-based access control

import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'delivery_partner' | 'restaurant_staff' | 'admin';
  restaurantId?: string; // For restaurant_staff role
  phone?: string;
  isActive: boolean;
  createdAt: number;
}

export interface AuthToken {
  userId: string;
  email: string;
  role: string;
  restaurantId?: string;
  exp: number;
  iat: number;
}

export interface LoginRequest {
  email: string;
  password?: string; // Optional for OTP-based login
  otp?: string;
  otpToken?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  message?: string;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'delivery_partner' | 'restaurant_staff';
  phone?: string;
  restaurantId?: string; // Required for restaurant_staff
  password?: string; // Optional for OTP-based registration
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  otpToken?: string;
  otp?: string; // For development/testing
  message?: string;
  error?: string;
}

// Role-based route permissions
export const ROLE_PERMISSIONS = {
  customer: [
    '/dashboard',
    '/checkout', 
    '/rewards',
    '/menu',
    '/profile'
  ],
  delivery_partner: [
    '/dashboard',
    '/delivery',
    '/kitchen',
    '/profile'
  ],
  restaurant_staff: [
    '/dashboard',
    '/kitchen',
    '/menu',
    '/orders',
    '/profile'
  ],
  admin: [
    '/dashboard',
    '/admin',
    '/kitchen',
    '/menu',
    '/orders',
    '/delivery',
    '/users',
    '/settings',
    '/profile'
  ]
} as const;

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/checkout',
  '/rewards',
  '/admin',
  '/kitchen',
  '/delivery',
  '/menu',
  '/orders',
  '/users',
  '/settings',
  '/profile'
];

class AuthService {
  private readonly jwtSecret: string;
  private readonly tokenExpiryHours: number = 24;
  private readonly refreshTokenExpiryDays: number = 7;

  constructor(env?: any) {
    // Use provided env or fallback to import.meta.env
    const environment = env || import.meta.env;
    
    this.jwtSecret = environment.JWT_SECRET || 's60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=';
    if (!environment.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET not set in environment. Using fallback for testing.');
    }
  }

  /**
   * Create JWT token for user authentication
   */
  private createToken(payload: Omit<AuthToken, 'exp' | 'iat'>, expiresInHours: number = this.tokenExpiryHours): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const exp = now + (expiresInHours * 3600);

    const tokenPayload = {
      ...payload,
      exp,
      iat: now
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');

    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(signatureInput)
      .digest('base64url');

    return `${signatureInput}.${signature}`;
  }

  /**
   * Verify and decode JWT token
   */
  private verifyToken(token: string): AuthToken | null {
    try {
      const [encodedHeader, encodedPayload, signature] = token.split('.');
      
      if (!encodedHeader || !encodedPayload || !signature) {
        return null;
      }

      // Verify signature
      const signatureInput = `${encodedHeader}.${encodedPayload}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(signatureInput)
        .digest('base64url');

      if (signature !== expectedSignature) {
        return null;
      }

      // Decode payload
      const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());

      // Check expiry
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      return payload as AuthToken;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }

  /**
   * Generate user ID
   */
  private generateUserId(): string {
    return crypto.randomUUID();
  }

  /**
   * Create mock user for development (in production, this would save to database)
   */
  private createMockUser(request: RegisterRequest): User {
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
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      // Validate restaurant staff requires restaurantId
      if (request.role === 'restaurant_staff' && !request.restaurantId) {
        return {
          success: false,
          error: 'Restaurant ID is required for restaurant staff role'
        };
      }

      // In production, check if user already exists in database
      // For now, we'll proceed with mock user creation

      const user = this.createMockUser(request);

      // Generate OTP token for email verification
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryTime = Date.now() + (10 * 60 * 1000); // 10 minutes

      const otpToken = this.createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId
      }, 10/60); // 10 minutes in hours

      return {
        success: true,
        user,
        otpToken,
        otp, // Include for development (remove in production)
        message: `Registration successful! Please verify your email with OTP: ${otp}`
      };

    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  /**
   * Verify OTP and complete registration/login
   */
  async verifyOTP(email: string, otp: string, otpToken: string): Promise<LoginResponse> {
    try {
      const tokenData = this.verifyToken(otpToken);
      
      if (!tokenData) {
        return {
          success: false,
          error: 'Invalid or expired OTP token'
        };
      }

      if (tokenData.email !== email) {
        return {
          success: false,
          error: 'Email mismatch'
        };
      }

      // In production, verify OTP from database
      // For now, we'll accept any 6-digit OTP for development
      if (!/^\d{6}$/.test(otp)) {
        return {
          success: false,
          error: 'Invalid OTP format'
        };
      }

      // Create user object (in production, fetch from database)
      const user: User = {
        id: tokenData.userId,
        email: tokenData.email,
        firstName: 'User', // In production, fetch from database
        lastName: 'Name',
        role: tokenData.role as any,
        restaurantId: tokenData.restaurantId,
        isActive: true,
        createdAt: Date.now()
      };

      // Generate access and refresh tokens
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
      }, this.refreshTokenExpiryDays * 24); // Convert days to hours

      return {
        success: true,
        user,
        accessToken,
        refreshToken,
        expiresIn: this.tokenExpiryHours * 3600, // Convert to seconds
        message: 'Authentication successful!'
      };

    } catch (error: any) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        error: 'OTP verification failed'
      };
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    try {
      const tokenData = this.verifyToken(refreshToken);
      
      if (!tokenData) {
        return {
          success: false,
          error: 'Invalid or expired refresh token'
        };
      }

      // Generate new access token
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
        message: 'Token refreshed successfully'
      };

    } catch (error: any) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        error: 'Token refresh failed'
      };
    }
  }

  /**
   * Get user from token
   */
  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const tokenData = this.verifyToken(token);
      
      if (!tokenData) {
        return null;
      }

      // In production, fetch user from database
      // For now, return mock user
      return {
        id: tokenData.userId,
        email: tokenData.email,
        firstName: 'User',
        lastName: 'Name',
        role: tokenData.role as any,
        restaurantId: tokenData.restaurantId,
        isActive: true,
        createdAt: Date.now()
      };

    } catch (error) {
      console.error('Get user from token error:', error);
      return null;
    }
  }

  /**
   * Check if user has permission for route
   */
  hasRoutePermission(user: User, pathname: string): boolean {
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    
    return userPermissions.some(route => pathname.startsWith(route));
  }

  /**
   * Check if route requires authentication
   */
  isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export class for dependency injection
export { AuthService };
