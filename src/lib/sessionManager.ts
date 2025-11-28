// JWT Session Management for Litterateur Restaurant Management System
// Handles access tokens, refresh tokens, and session lifecycle

import crypto from 'crypto';
import { AppwriteService } from './appwriteService.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  sessionId: string;
  iat: number;
  exp: number;
  iss: 'litterateur';
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
}

export interface UserSession {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  sessionId: string;
}

const ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 minutes
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days

export class SessionManager {
  private appwrite: AppwriteService;
  private jwtSecret: string;

  constructor(env?: any) {
    // Use provided env or fallback to import.meta.env
    const environment = env || import.meta.env;
    
    this.appwrite = new AppwriteService(environment);
    this.jwtSecret = environment.JWT_SECRET || 'your-secret-key-change-in-production';
    
    if (this.jwtSecret === 'your-secret-key-change-in-production') {
      console.warn('⚠️  Using default JWT secret. Please set JWT_SECRET in production!');
    }
  }

  /**
   * Create a new user session with access and refresh tokens
   */
  async createSession(
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: UserSession;
  }> {
    const sessionId = crypto.randomUUID();
    
    // Fetch user with role and permissions
    const user = await this.appwrite.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const role = await this.appwrite.getRole(user.roleId);
    if (!role) {
      throw new Error('User role not found');
    }

    const permissions = role.permissions || [];

    // Create access token payload
    const accessPayload: TokenPayload = {
      userId,
      email: user.email,
      role: role.roleName,
      permissions,
      sessionId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY,
      iss: 'litterateur'
    };

    // Create refresh token payload
    const refreshPayload: RefreshTokenPayload = {
      userId,
      sessionId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRY
    };

    // Sign tokens
    const accessToken = this.signToken(accessPayload);
    const refreshToken = this.signToken(refreshPayload);

    // Hash tokens before storing
    const tokenHash = this.hashToken(accessToken);
    const refreshTokenHash = this.hashToken(refreshToken);

    // Create session in database
    await this.appwrite.createSession({
      userId,
      token: tokenHash,
      refreshToken: refreshTokenHash,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000),
    });

    // Update user's last login
    await this.appwrite.updateUser(userId, {
      lastLoginAt: new Date()
    });

    // Log authentication event
    await this.logAuditEvent({
      userId,
      action: 'login',
      resource: 'sessions',
      ipAddress,
      userAgent,
      status: 'success',
    });

    const userSession: UserSession = {
      userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: role.roleName,
      permissions,
      sessionId
    };

    return {
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRY,
      user: userSession
    };
  }

  /**
   * Refresh an existing session using refresh token
   */
  async refreshToken(
    refreshToken: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    try {
      const decoded = this.verifyToken(refreshToken) as RefreshTokenPayload;
      const sessionId = decoded.sessionId;

      // Verify session exists and is valid
      const session = await this.appwrite.getSession(sessionId);
      
      if (!session || session.revokedAt) {
        throw new Error('Invalid or expired session');
      }

      // Verify refresh token matches stored hash
      const refreshTokenHash = this.hashToken(refreshToken);
      if (session.refreshToken !== refreshTokenHash) {
        throw new Error('Invalid refresh token');
      }

      // Create new access token
      const user = await this.appwrite.getUser(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const role = await this.appwrite.getRole(user.roleId);
      if (!role) {
        throw new Error('User role not found');
      }

      const accessPayload: TokenPayload = {
        userId: decoded.userId,
        email: user.email,
        role: role.roleName,
        permissions: role.permissions || [],
        sessionId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY,
        iss: 'litterateur'
      };

      const newAccessToken = this.signToken(accessPayload);
      const newAccessTokenHash = this.hashToken(newAccessToken);

      // Update session with new access token
      await this.appwrite.updateSession(sessionId, {
        token: newAccessTokenHash,
        expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000)
      });

      // Create new refresh token (rotate refresh tokens for security)
      const newRefreshPayload: RefreshTokenPayload = {
        userId: decoded.userId,
        sessionId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRY
      };

      const newRefreshToken = this.signToken(newRefreshPayload);
      const newRefreshTokenHash = this.hashToken(newRefreshToken);

      await this.appwrite.updateSession(sessionId, {
        refreshToken: newRefreshTokenHash
      });

      await this.logAuditEvent({
        userId: decoded.userId,
        action: 'token_refresh',
        resource: 'sessions',
        ipAddress,
        userAgent,
        status: 'success',
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY
      };

    } catch (error: any) {
      await this.logAuditEvent({
        userId: 'unknown',
        action: 'token_refresh_failed',
        resource: 'sessions',
        ipAddress,
        userAgent,
        status: 'failure',
        errorMessage: error?.message || 'Token refresh failed'
      });
      throw error;
    }
  }

  /**
   * Validate access token and return session info
   */
  async validateAccessToken(token: string): Promise<UserSession> {
    try {
      const decoded = this.verifyToken(token) as TokenPayload;
      
      // Verify session exists and is not revoked
      const session = await this.appwrite.getSession(decoded.sessionId);
      
      if (!session || session.revokedAt) {
        throw new Error('Session not found or revoked');
      }

      // Verify token matches stored hash
      const tokenHash = this.hashToken(token);
      if (session.token !== tokenHash) {
        throw new Error('Invalid token');
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
        firstName: '', // Will be populated from user data if needed
        lastName: '',
        role: decoded.role,
        permissions: decoded.permissions,
        sessionId: decoded.sessionId
      };

    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  /**
   * Revoke a session (logout)
   */
  async revokeSession(sessionId: string, userId: string, ipAddress: string, userAgent: string) {
    try {
      await this.appwrite.updateSession(sessionId, {
        revokedAt: new Date()
      });

      await this.logAuditEvent({
        userId,
        action: 'logout',
        resource: 'sessions',
        ipAddress,
        userAgent,
        status: 'success',
      });

    } catch (error: any) {
      await this.logAuditEvent({
        userId,
        action: 'logout_failed',
        resource: 'sessions',
        ipAddress,
        userAgent,
        status: 'failure',
        errorMessage: error?.message || 'Logout failed'
      });
      throw error;
    }
  }

  /**
   * Revoke all sessions for a user
   */
  async revokeAllUserSessions(userId: string) {
    try {
      const sessions = await this.appwrite.getUserSessions(userId);
      
      for (const session of sessions) {
        if (!session.revokedAt) {
          await this.appwrite.updateSession(session.sessionId, {
            revokedAt: new Date()
          });
        }
      }

      await this.logAuditEvent({
        userId,
        action: 'all_sessions_revoked',
        resource: 'sessions',
        ipAddress: 'system',
        userAgent: 'system',
        status: 'success',
      });

    } catch (error) {
      console.error('Error revoking user sessions:', error);
      throw error;
    }
  }

  /**
   * Sign JWT token
   */
  private signToken(payload: any): string {
    // In a real implementation, use a JWT library like jsonwebtoken
    // For now, we'll create a simple base64 encoded token
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Verify JWT token
   */
  private verifyToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const [encodedHeader, encodedPayload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', this.jwtSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    // Decode payload
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }

    return payload;
  }

  /**
   * Hash token for storage
   */
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Log audit event
   */
  private async logAuditEvent(event: {
    userId: string;
    action: string;
    resource: string;
    ipAddress: string;
    userAgent: string;
    status: 'success' | 'failure';
    errorMessage?: string;
  }) {
    try {
      const auditLogData = {
        userId: event.userId,
        action: event.action,
        resource: event.resource,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
        status: event.status,
        errorMessage: event.errorMessage
      };
      
      await this.appwrite.createAuditLog(auditLogData);
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }
}

export const sessionManager = new SessionManager();
