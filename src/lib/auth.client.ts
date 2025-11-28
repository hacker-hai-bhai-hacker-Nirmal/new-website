// Frontend Authentication Service for Litterateur Restaurant Management System
// Handles authentication, token management, and user session in the browser

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: string;
  permissions: string[];
  status: string;
  preferences: {
    language: string;
    notificationsEnabled: boolean;
    theme: string;
  };
  lastLoginAt?: string;
  createdAt: string;
}

export interface RegisterData {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'delivery_partner' | 'restaurant_staff';
  restaurantId?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: User;
  error?: string;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  userId?: string;
  email?: string;
  otpSent?: boolean;
  expiresIn?: number;
  error?: string;
  message?: string;
}

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private user: User | null = null;
  private tokenRefreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.loadFromStorage();
    this.setupTokenRefresh();
  }

  /**
   * Load authentication data from localStorage
   */
  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        const userStr = localStorage.getItem('user');
        if (userStr) {
          this.user = JSON.parse(userStr);
        }
      } catch (error) {
        console.error('Error loading auth data from storage:', error);
        this.clearStorage();
      }
    }
  }

  /**
   * Save authentication data to localStorage
   */
  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        if (this.accessToken) {
          localStorage.setItem('accessToken', this.accessToken);
        }
        if (this.refreshToken) {
          localStorage.setItem('refreshToken', this.refreshToken);
        }
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (error) {
        console.error('Error saving auth data to storage:', error);
      }
    }
  }

  /**
   * Clear all authentication data from storage
   */
  private clearStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
  }

  /**
   * Setup automatic token refresh
   */
  private setupTokenRefresh() {
    if (this.tokenRefreshTimer) {
      clearInterval(this.tokenRefreshTimer);
    }

    // Refresh token 5 minutes before it expires
    this.tokenRefreshTimer = setInterval(async () => {
      if (this.accessToken && this.refreshToken) {
        try {
          await this.refreshTokens();
        } catch (error) {
          console.error('Auto token refresh failed:', error);
          // If refresh fails, logout the user
          await this.logout();
        }
      }
    }, 10 * 60 * 1000); // Check every 10 minutes
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  /**
   * Verify OTP and complete authentication
   */
  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Invalid OTP');
      }

      const data = await response.json();
      
      if (data.success) {
        this.setTokens(data.accessToken!, data.refreshToken!);
        this.user = data.user!;
        this.saveToStorage();
        this.setupTokenRefresh();
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OTP verification failed'
      };
    }
  }

  /**
   * Refresh access and refresh tokens
   */
  async refreshTokens(): Promise<AuthResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Token refresh failed');
      }

      const data = await response.json();
      
      if (data.success) {
        this.setTokens(data.accessToken!, data.refreshToken!);
        this.saveToStorage();
      }

      return data;
    } catch (error) {
      // If refresh fails, clear tokens and logout
      this.clearStorage();
      throw error;
    }
  }

  /**
   * Get current user information
   */
  async getMe(): Promise<User> {
    if (this.user) {
      return this.user;
    }

    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch user');
      }

      const data = await response.json();
      
      if (data.success && data.user) {
        this.user = data.user;
        this.saveToStorage();
        return this.user;
      }

      throw new Error('Invalid user data received');
    } catch (error) {
      // If we can't get user info, clear tokens
      this.clearStorage();
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      if (this.accessToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local data
      this.clearStorage();
      if (this.tokenRefreshTimer) {
        clearInterval(this.tokenRefreshTimer);
        this.tokenRefreshTimer = null;
      }
    }
  }

  /**
   * Set tokens and update state
   */
  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  /**
   * Get access token for API calls
   */
  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.user || null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user;
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(permission: string): boolean {
    return this.user?.permissions.includes(permission) ?? false;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(...roles: string[]): boolean {
    return this.user ? roles.includes(this.user.role) : false;
  }

  /**
   * Check if user can access resource based on permissions
   */
  canAccess(resource: string, action: string): boolean {
    const permission = `${resource}.${action}`;
    return this.hasPermission(permission);
  }

  /**
   * Get user-friendly role name
   */
  getRoleDisplayName(): string {
    const roleNames: Record<string, string> = {
      admin: 'Administrator',
      kitchen_staff: 'Kitchen Staff',
      delivery_partner: 'Delivery Partner',
      customer: 'Customer',
      restaurant_staff: 'Restaurant Staff'
    };
    
    return this.user ? (roleNames[this.user.role] || this.user.role) : 'Unknown';
  }

  /**
   * Get user-friendly permission names
   */
  getPermissionDisplayNames(): string[] {
    const permissionNames: Record<string, string> = {
      'users.create': 'Create Users',
      'users.read': 'View Users',
      'users.update': 'Update Users',
      'users.delete': 'Delete Users',
      'menu.create': 'Create Menu Items',
      'menu.read': 'View Menu',
      'menu.update': 'Update Menu Items',
      'menu.delete': 'Delete Menu Items',
      'orders.create': 'Create Orders',
      'orders.read': 'View Orders',
      'orders.update': 'Update Orders',
      'orders.delete': 'Delete Orders',
      'inventory.manage': 'Manage Inventory',
      'reports.view': 'View Reports',
      'audit.view': 'View Audit Logs',
      'kitchen.process': 'Process Kitchen Orders',
      'delivery.manage': 'Manage Deliveries'
    };
    
    if (!this.user?.permissions) return [];
    
    return this.user.permissions.map(permission => 
      permissionNames[permission] || permission
    );
  }

  /**
   * Make authenticated API request
   */
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    let response = await fetch(url, { ...options, headers });

    // If we get a 401, try to refresh the token once
    if (response.status === 401 && this.refreshToken) {
      try {
        await this.refreshTokens();
        
        // Retry the request with new token
        headers.Authorization = `Bearer ${this.accessToken}`;
        response = await fetch(url, { ...options, headers });
      } catch (refreshError) {
        // Refresh failed, logout the user
        await this.logout();
        throw new Error('Session expired. Please login again.');
      }
    }

    return response;
  }

  /**
   * Initialize auth state (call this on app startup)
   */
  async initialize(): Promise<boolean> {
    if (this.accessToken && !this.user) {
      try {
        await this.getMe();
        return true;
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        this.clearStorage();
        return false;
      }
    }
    return this.isAuthenticated();
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export types for use in components
export type { AuthService };
