globalThis.process ??= {}; globalThis.process.env ??= {};
import crypto from 'crypto';
import { Client, Account, Databases, ID, Query } from './sdk_BM-XKegH.mjs';

class AppwriteService {
  client;
  account;
  databases;
  databaseId;
  constructor() {
    this.client = new Client().setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("6900b1ed001604d8befb");
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.databaseId = "main-db";
  }
  // User Management Methods
  async createUser(userData) {
    const user = await this.databases.createDocument(
      this.databaseId,
      "Users",
      ID.unique(),
      {
        ...userData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return user;
  }
  async getUser(userId) {
    try {
      const user = await this.databases.getDocument(
        this.databaseId,
        "Users",
        userId
      );
      return user;
    } catch (error) {
      return null;
    }
  }
  async getUserByEmail(email) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "Users",
        [Query.equal("email", email)]
      );
      return result.documents[0] || null;
    } catch (error) {
      return null;
    }
  }
  async updateUser(userId, updates) {
    const user = await this.databases.updateDocument(
      this.databaseId,
      "Users",
      userId,
      {
        ...updates,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return user;
  }
  // Role Management Methods
  async createRole(roleData) {
    const role = await this.databases.createDocument(
      this.databaseId,
      "Roles",
      ID.unique(),
      {
        ...roleData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return role;
  }
  async getRole(roleId) {
    try {
      const role = await this.databases.getDocument(
        this.databaseId,
        "Roles",
        roleId
      );
      return role;
    } catch (error) {
      return null;
    }
  }
  async getRoleByName(roleName) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "Roles",
        [Query.equal("roleName", roleName)]
      );
      return result.documents[0] || null;
    } catch (error) {
      return null;
    }
  }
  async getAllRoles() {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "Roles"
      );
      return result.documents;
    } catch (error) {
      return [];
    }
  }
  // Permission Management Methods
  async createPermission(permissionData) {
    const permission = await this.databases.createDocument(
      this.databaseId,
      "Permissions",
      ID.unique(),
      {
        ...permissionData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return permission;
  }
  async getAllPermissions() {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "Permissions"
      );
      return result.documents;
    } catch (error) {
      return [];
    }
  }
  // Session Management Methods
  async createSession(sessionData) {
    const session = await this.databases.createDocument(
      this.databaseId,
      "Sessions",
      ID.unique(),
      {
        ...sessionData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return session;
  }
  async getSession(sessionId) {
    try {
      const session = await this.databases.getDocument(
        this.databaseId,
        "Sessions",
        sessionId
      );
      return session;
    } catch (error) {
      return null;
    }
  }
  async updateSession(sessionId, updates) {
    const session = await this.databases.updateDocument(
      this.databaseId,
      "Sessions",
      sessionId,
      updates
    );
    return session;
  }
  async getUserSessions(userId) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "Sessions",
        [Query.equal("userId", userId)]
      );
      return result.documents;
    } catch (error) {
      return [];
    }
  }
  // OTP Management Methods
  async storeOTP(userId, otp, expiresAt, purpose = "verification") {
    await this.databases.createDocument(
      this.databaseId,
      "OTPStorage",
      ID.unique(),
      {
        userId,
        otp,
        purpose,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        expiresAt: expiresAt.toISOString(),
        used: false
      }
    );
  }
  async verifyOTP(userId, otp) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        "OTPStorage",
        [
          Query.equal("userId", userId),
          Query.equal("otp", otp),
          Query.equal("used", false),
          Query.greaterThan("expiresAt", (/* @__PURE__ */ new Date()).toISOString())
        ]
      );
      if (result.documents.length > 0) {
        const otpData = result.documents[0];
        await this.databases.updateDocument(
          this.databaseId,
          "OTPStorage",
          otpData.$id,
          {
            used: true,
            usedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        );
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  // Audit Log Methods
  async createAuditLog(auditData) {
    const audit = await this.databases.createDocument(
      this.databaseId,
      "AuditLogs",
      ID.unique(),
      {
        ...auditData,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    );
    return audit;
  }
  async queryAuditLogs(filters) {
    try {
      const queries = [];
      if (filters.userId) queries.push(Query.equal("userId", filters.userId));
      if (filters.action) queries.push(Query.equal("action", filters.action));
      if (filters.resource) queries.push(Query.equal("resource", filters.resource));
      if (filters.startDate) queries.push(Query.greaterThanEqual("timestamp", filters.startDate.toISOString()));
      if (filters.endDate) queries.push(Query.lessThanEqual("timestamp", filters.endDate.toISOString()));
      const result = await this.databases.listDocuments(
        this.databaseId,
        "AuditLogs",
        queries
      );
      return result.documents;
    } catch (error) {
      return [];
    }
  }
  // Collection Management Methods (for setup)
  async createCollection(name, fields, indexes) {
    console.log(`Collection ${name} should be created manually in Appwrite console`);
  }
  // Helper Methods
  generateId() {
    return ID.unique();
  }
  // Export existing Appwrite instances for backward compatibility
  getClient() {
    return this.client;
  }
  getAccount() {
    return this.account;
  }
  getDatabases() {
    return this.databases;
  }
}
new AppwriteService();

const ACCESS_TOKEN_EXPIRY = 15 * 60;
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60;
class SessionManager {
  appwrite;
  jwtSecret;
  constructor() {
    this.appwrite = new AppwriteService();
    this.jwtSecret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    if (this.jwtSecret === "your-secret-key-change-in-production") {
      console.warn("⚠️  Using default JWT secret. Please set JWT_SECRET in production!");
    }
  }
  /**
   * Create a new user session with access and refresh tokens
   */
  async createSession(userId, ipAddress, userAgent) {
    const sessionId = crypto.randomUUID();
    const user = await this.appwrite.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const role = await this.appwrite.getRole(user.roleId);
    if (!role) {
      throw new Error("User role not found");
    }
    const permissions = role.permissions || [];
    const accessPayload = {
      userId,
      email: user.email,
      role: role.roleName,
      permissions,
      sessionId,
      iat: Math.floor(Date.now() / 1e3),
      exp: Math.floor(Date.now() / 1e3) + ACCESS_TOKEN_EXPIRY,
      iss: "litterateur"
    };
    const refreshPayload = {
      userId,
      sessionId,
      iat: Math.floor(Date.now() / 1e3),
      exp: Math.floor(Date.now() / 1e3) + REFRESH_TOKEN_EXPIRY
    };
    const accessToken = this.signToken(accessPayload);
    const refreshToken = this.signToken(refreshPayload);
    const tokenHash = this.hashToken(accessToken);
    const refreshTokenHash = this.hashToken(refreshToken);
    await this.appwrite.createSession({
      userId,
      token: tokenHash,
      refreshToken: refreshTokenHash,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1e3)
    });
    await this.appwrite.updateUser(userId, {
      lastLoginAt: /* @__PURE__ */ new Date()
    });
    await this.logAuditEvent({
      userId,
      action: "login",
      resource: "sessions",
      ipAddress,
      userAgent,
      status: "success"
    });
    const userSession = {
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
  async refreshToken(refreshToken, ipAddress, userAgent) {
    try {
      const decoded = this.verifyToken(refreshToken);
      const sessionId = decoded.sessionId;
      const session = await this.appwrite.getSession(sessionId);
      if (!session || session.revokedAt) {
        throw new Error("Invalid or expired session");
      }
      const refreshTokenHash = this.hashToken(refreshToken);
      if (session.refreshToken !== refreshTokenHash) {
        throw new Error("Invalid refresh token");
      }
      const user = await this.appwrite.getUser(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }
      const role = await this.appwrite.getRole(user.roleId);
      if (!role) {
        throw new Error("User role not found");
      }
      const accessPayload = {
        userId: decoded.userId,
        email: user.email,
        role: role.roleName,
        permissions: role.permissions || [],
        sessionId,
        iat: Math.floor(Date.now() / 1e3),
        exp: Math.floor(Date.now() / 1e3) + ACCESS_TOKEN_EXPIRY,
        iss: "litterateur"
      };
      const newAccessToken = this.signToken(accessPayload);
      const newAccessTokenHash = this.hashToken(newAccessToken);
      await this.appwrite.updateSession(sessionId, {
        token: newAccessTokenHash,
        expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1e3)
      });
      const newRefreshPayload = {
        userId: decoded.userId,
        sessionId,
        iat: Math.floor(Date.now() / 1e3),
        exp: Math.floor(Date.now() / 1e3) + REFRESH_TOKEN_EXPIRY
      };
      const newRefreshToken = this.signToken(newRefreshPayload);
      const newRefreshTokenHash = this.hashToken(newRefreshToken);
      await this.appwrite.updateSession(sessionId, {
        refreshToken: newRefreshTokenHash
      });
      await this.logAuditEvent({
        userId: decoded.userId,
        action: "token_refresh",
        resource: "sessions",
        ipAddress,
        userAgent,
        status: "success"
      });
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY
      };
    } catch (error) {
      await this.logAuditEvent({
        userId: "unknown",
        action: "token_refresh_failed",
        resource: "sessions",
        ipAddress,
        userAgent,
        status: "failure",
        errorMessage: error?.message || "Token refresh failed"
      });
      throw error;
    }
  }
  /**
   * Validate access token and return session info
   */
  async validateAccessToken(token) {
    try {
      const decoded = this.verifyToken(token);
      const session = await this.appwrite.getSession(decoded.sessionId);
      if (!session || session.revokedAt) {
        throw new Error("Session not found or revoked");
      }
      const tokenHash = this.hashToken(token);
      if (session.token !== tokenHash) {
        throw new Error("Invalid token");
      }
      return {
        userId: decoded.userId,
        email: decoded.email,
        firstName: "",
        // Will be populated from user data if needed
        lastName: "",
        role: decoded.role,
        permissions: decoded.permissions,
        sessionId: decoded.sessionId
      };
    } catch (error) {
      throw new Error("Invalid access token");
    }
  }
  /**
   * Revoke a session (logout)
   */
  async revokeSession(sessionId, userId, ipAddress, userAgent) {
    try {
      await this.appwrite.updateSession(sessionId, {
        revokedAt: /* @__PURE__ */ new Date()
      });
      await this.logAuditEvent({
        userId,
        action: "logout",
        resource: "sessions",
        ipAddress,
        userAgent,
        status: "success"
      });
    } catch (error) {
      await this.logAuditEvent({
        userId,
        action: "logout_failed",
        resource: "sessions",
        ipAddress,
        userAgent,
        status: "failure",
        errorMessage: error?.message || "Logout failed"
      });
      throw error;
    }
  }
  /**
   * Revoke all sessions for a user
   */
  async revokeAllUserSessions(userId) {
    try {
      const sessions = await this.appwrite.getUserSessions(userId);
      for (const session of sessions) {
        if (!session.revokedAt) {
          await this.appwrite.updateSession(session.sessionId, {
            revokedAt: /* @__PURE__ */ new Date()
          });
        }
      }
      await this.logAuditEvent({
        userId,
        action: "all_sessions_revoked",
        resource: "sessions",
        ipAddress: "system",
        userAgent: "system",
        status: "success"
      });
    } catch (error) {
      console.error("Error revoking user sessions:", error);
      throw error;
    }
  }
  /**
   * Sign JWT token
   */
  signToken(payload) {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto.createHmac("sha256", this.jwtSecret).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  /**
   * Verify JWT token
   */
  verifyToken(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", this.jwtSecret).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");
    if (signature !== expectedSignature) {
      throw new Error("Invalid token signature");
    }
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1e3)) {
      throw new Error("Token expired");
    }
    return payload;
  }
  /**
   * Hash token for storage
   */
  hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
  /**
   * Log audit event
   */
  async logAuditEvent(event) {
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
      console.error("Failed to log audit event:", error);
    }
  }
}
const sessionManager = new SessionManager();

export { AppwriteService as A, sessionManager as s };
