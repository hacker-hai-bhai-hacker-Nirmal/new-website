// Appwrite Service Class for RBAC System
// Provides a clean interface for database operations with role-based access control

import { Client, Account, Databases, ID, Query } from 'appwrite';

export interface User {
  userId: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  roleId: string;
  restaurantId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  lastLoginAt?: string | Date;
  verificationToken?: string;
  verificationTokenExpiry?: string | Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: string | Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  preferences: {
    language: string;
    notificationsEnabled: boolean;
    theme: 'light' | 'dark';
  };
}

export interface Role {
  roleId: string;
  roleName: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Permission {
  permissionId: string;
  permissionName: string;
  description: string;
  resource: string;
  action: string;
  createdAt: string | Date;
}

export interface Session {
  sessionId: string;
  userId: string;
  token: string;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  revokedAt?: string | Date;
}

export interface AuditLog {
  auditId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  previousValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure';
  errorMessage?: string;
  timestamp: string | Date;
}

export interface OTPData {
  otpId: string;
  userId: string;
  otp: string;
  purpose: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  used: boolean;
  usedAt?: string | Date;
}

export class AppwriteService {
  private client: Client;
  private account: Account;
  private databases: Databases;
  private databaseId: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(import.meta.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
      .setProject(import.meta.env.APPWRITE_PROJECT_ID || '6900b1ed001604d8befb');
    
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.databaseId = import.meta.env.APPWRITE_DATABASE_ID || 'main-db';
  }

  // User Management Methods
  async createUser(userData: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await this.databases.createDocument(
      this.databaseId,
      'Users',
      ID.unique(),
      {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
    return user as unknown as User;
  }

  async getUser(userId: string): Promise<User | null> {
    try {
      const user = await this.databases.getDocument(
        this.databaseId,
        'Users',
        userId
      );
      return user as unknown as User;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'Users',
        [Query.equal('email', email)]
      );
      return result.documents[0] as unknown as User || null;
    } catch (error) {
      return null;
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const user = await this.databases.updateDocument(
      this.databaseId,
      'Users',
      userId,
      {
        ...updates,
        updatedAt: new Date().toISOString()
      }
    );
    return user as unknown as User;
  }

  // Role Management Methods
  async createRole(roleData: Omit<Role, 'roleId' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    const role = await this.databases.createDocument(
      this.databaseId,
      'Roles',
      ID.unique(),
      {
        ...roleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
    return role as unknown as Role;
  }

  async getRole(roleId: string): Promise<Role | null> {
    try {
      const role = await this.databases.getDocument(
        this.databaseId,
        'Roles',
        roleId
      );
      return role as unknown as Role;
    } catch (error) {
      return null;
    }
  }

  async getRoleByName(roleName: string): Promise<Role | null> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'Roles',
        [Query.equal('roleName', roleName)]
      );
      return result.documents[0] as unknown as Role || null;
    } catch (error) {
      return null;
    }
  }

  async getAllRoles(): Promise<Role[]> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'Roles'
      );
      return result.documents as unknown as Role[];
    } catch (error) {
      return [];
    }
  }

  // Permission Management Methods
  async createPermission(permissionData: Omit<Permission, 'permissionId' | 'createdAt'>): Promise<Permission> {
    const permission = await this.databases.createDocument(
      this.databaseId,
      'Permissions',
      ID.unique(),
      {
        ...permissionData,
        createdAt: new Date().toISOString()
      }
    );
    return permission as unknown as Permission;
  }

  async getAllPermissions(): Promise<Permission[]> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'Permissions'
      );
      return result.documents as unknown as Permission[];
    } catch (error) {
      return [];
    }
  }

  // Session Management Methods
  async createSession(sessionData: Omit<Session, 'sessionId' | 'createdAt'>): Promise<Session> {
    const session = await this.databases.createDocument(
      this.databaseId,
      'Sessions',
      ID.unique(),
      {
        ...sessionData,
        createdAt: new Date().toISOString()
      }
    );
    return session as unknown as Session;
  }

  async getSession(sessionId: string): Promise<Session | null> {
    try {
      const session = await this.databases.getDocument(
        this.databaseId,
        'Sessions',
        sessionId
      );
      return session as unknown as Session;
    } catch (error) {
      return null;
    }
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<Session> {
    const session = await this.databases.updateDocument(
      this.databaseId,
      'Sessions',
      sessionId,
      updates
    );
    return session as unknown as Session;
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'Sessions',
        [Query.equal('userId', userId)]
      );
      return result.documents as unknown as Session[];
    } catch (error) {
      return [];
    }
  }

  // OTP Management Methods
  async storeOTP(userId: string, otp: string, expiresAt: Date, purpose: string = 'verification'): Promise<void> {
    await this.databases.createDocument(
      this.databaseId,
      'OTPStorage',
      ID.unique(),
      {
        userId,
        otp,
        purpose,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        used: false
      }
    );
  }

  async verifyOTP(userId: string, otp: string): Promise<boolean> {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        'OTPStorage',
        [
          Query.equal('userId', userId),
          Query.equal('otp', otp),
          Query.equal('used', false),
          Query.greaterThan('expiresAt', new Date().toISOString())
        ]
      );

      if (result.documents.length > 0) {
        // Mark OTP as used
        const otpData = result.documents[0];
        await this.databases.updateDocument(
          this.databaseId,
          'OTPStorage',
          otpData.$id,
          {
            used: true,
            usedAt: new Date().toISOString()
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
  async createAuditLog(auditData: Omit<AuditLog, 'auditId' | 'timestamp'>): Promise<AuditLog> {
    const audit = await this.databases.createDocument(
      this.databaseId,
      'AuditLogs',
      ID.unique(),
      {
        ...auditData,
        timestamp: new Date().toISOString()
      }
    );
    return audit as unknown as AuditLog;
  }

  async queryAuditLogs(filters: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<AuditLog[]> {
    try {
      const queries = [];
      
      if (filters.userId) queries.push(Query.equal('userId', filters.userId));
      if (filters.action) queries.push(Query.equal('action', filters.action));
      if (filters.resource) queries.push(Query.equal('resource', filters.resource));
      if (filters.startDate) queries.push(Query.greaterThanEqual('timestamp', filters.startDate.toISOString()));
      if (filters.endDate) queries.push(Query.lessThanEqual('timestamp', filters.endDate.toISOString()));
      
      const result = await this.databases.listDocuments(
        this.databaseId,
        'AuditLogs',
        queries
      );
      return result.documents as unknown as AuditLog[];
    } catch (error) {
      return [];
    }
  }

  // Collection Management Methods (for setup)
  async createCollection(name: string, fields: any[], indexes?: string[]): Promise<void> {
    // This would typically be done through Appwrite console
    // For now, we'll assume collections exist
    console.log(`Collection ${name} should be created manually in Appwrite console`);
  }

  // Helper Methods
  generateId(): string {
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

// Export singleton instance
export const appwriteService = new AppwriteService();

// Export for backward compatibility
export { Client, Account, Databases, ID, Query };
