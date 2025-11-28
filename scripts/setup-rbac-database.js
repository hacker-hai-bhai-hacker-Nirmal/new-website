// Setup RBAC Database Schema for Litterateur Restaurant Management System
// This script creates all necessary collections and initial data for role-based access control

import { AppwriteService } from '../src/lib/appwrite.js';

const appwrite = new AppwriteService();

// Database schema definitions
const collections = [
  {
    name: 'Users',
    attributes: {
      userId: 'string (primary key)',
      email: 'string (unique)',
      phone: 'string (unique, optional)',
      firstName: 'string',
      lastName: 'string',
      profileImage: 'string (optional)',
      status: 'string (enum: active, inactive, suspended, pending_verification)',
      roleId: 'string (foreign key to Roles)',
      restaurantId: 'string (optional, for staff roles)',
      createdAt: 'datetime',
      updatedAt: 'datetime',
      lastLoginAt: 'datetime (optional)',
      verificationToken: 'string (optional)',
      verificationTokenExpiry: 'datetime (optional)',
      passwordResetToken: 'string (optional)',
      passwordResetTokenExpiry: 'datetime (optional)',
      twoFactorEnabled: 'boolean',
      twoFactorSecret: 'string (optional, encrypted)',
      preferences: {
        language: 'string',
        notificationsEnabled: 'boolean',
        theme: 'string (light | dark)'
      }
    },
    indexes: ['email', 'phone', 'roleId', 'status', 'restaurantId']
  },
  {
    name: 'Roles',
    attributes: {
      roleId: 'string (primary key)',
      roleName: 'string (unique): admin, kitchen_staff, delivery_partner, customer, restaurant_staff',
      description: 'string',
      permissions: 'array of string (permission IDs)',
      isSystem: 'boolean (true for built-in roles)',
      createdAt: 'datetime',
      updatedAt: 'datetime'
    },
    indexes: ['roleName']
  },
  {
    name: 'Permissions',
    attributes: {
      permissionId: 'string (primary key)',
      permissionName: 'string (unique): orders.create, orders.view, menu.edit, etc.',
      description: 'string',
      resource: 'string: orders, menu, users, inventory, etc.',
      action: 'string: create, read, update, delete',
      createdAt: 'datetime'
    },
    indexes: ['permissionName', 'resource', 'action']
  },
  {
    name: 'UserPermissions',
    attributes: {
      id: 'string (primary key)',
      userId: 'string (foreign key)',
      permissionId: 'string (foreign key)',
      grantedAt: 'datetime',
      grantedBy: 'string (admin user ID)',
      expiresAt: 'datetime (optional)',
      notes: 'string (optional)'
    },
    indexes: ['userId', 'permissionId']
  },
  {
    name: 'Sessions',
    attributes: {
      sessionId: 'string (primary key)',
      userId: 'string (foreign key)',
      token: 'string (JWT token hash)',
      refreshToken: 'string (JWT refresh token hash)',
      ipAddress: 'string',
      userAgent: 'string',
      deviceId: 'string (optional)',
      createdAt: 'datetime',
      expiresAt: 'datetime',
      revokedAt: 'datetime (optional)'
    },
    indexes: ['userId', 'sessionId', 'expiresAt']
  },
  {
    name: 'AuditLogs',
    attributes: {
      auditId: 'string (primary key)',
      userId: 'string (foreign key)',
      action: 'string: login, logout, permission_granted, menu_updated, etc.',
      resource: 'string: users, menu, orders, etc.',
      resourceId: 'string (optional)',
      previousValue: 'object (optional)',
      newValue: 'object (optional)',
      ipAddress: 'string',
      userAgent: 'string',
      status: 'string (success | failure)',
      errorMessage: 'string (optional)',
      timestamp: 'datetime'
    },
    indexes: ['userId', 'action', 'resource', 'timestamp']
  }
];

// Initial data for permissions
const permissions = [
  // User management
  { permissionName: 'users.create', description: 'Create new users', resource: 'users', action: 'create' },
  { permissionName: 'users.read', description: 'View user information', resource: 'users', action: 'read' },
  { permissionName: 'users.update', description: 'Update user information', resource: 'users', action: 'update' },
  { permissionName: 'users.delete', description: 'Delete users', resource: 'users', action: 'delete' },
  
  // Menu management
  { permissionName: 'menu.create', description: 'Create menu items', resource: 'menu', action: 'create' },
  { permissionName: 'menu.read', description: 'View menu items', resource: 'menu', action: 'read' },
  { permissionName: 'menu.update', description: 'Update menu items', resource: 'menu', action: 'update' },
  { permissionName: 'menu.delete', description: 'Delete menu items', resource: 'menu', action: 'delete' },
  
  // Order management
  { permissionName: 'orders.create', description: 'Create new orders', resource: 'orders', action: 'create' },
  { permissionName: 'orders.read', description: 'View orders', resource: 'orders', action: 'read' },
  { permissionName: 'orders.update', description: 'Update orders', resource: 'orders', action: 'update' },
  { permissionName: 'orders.delete', description: 'Delete orders', resource: 'orders', action: 'delete' },
  
  // Inventory management
  { permissionName: 'inventory.manage', description: 'Manage inventory', resource: 'inventory', action: 'update' },
  
  // Reports and analytics
  { permissionName: 'reports.view', description: 'View reports and analytics', resource: 'reports', action: 'read' },
  
  // Audit and security
  { permissionName: 'audit.view', description: 'View audit logs', resource: 'audit', action: 'read' },
  
  // Kitchen operations
  { permissionName: 'kitchen.process', description: 'Process kitchen orders', resource: 'kitchen', action: 'update' },
  
  // Delivery operations
  { permissionName: 'delivery.manage', description: 'Manage deliveries', resource: 'delivery', action: 'update' }
];

// Initial roles with permissions
const roles = [
  {
    roleName: 'admin',
    description: 'Full system administrator with all permissions',
    permissions: permissions.map(p => p.permissionName),
    isSystem: true
  },
  {
    roleName: 'kitchen_staff',
    description: 'Kitchen staff with menu and order processing permissions',
    permissions: ['menu.read', 'menu.update', 'orders.read', 'orders.update', 'kitchen.process'],
    isSystem: true
  },
  {
    roleName: 'delivery_partner',
    description: 'Delivery partner with delivery management permissions',
    permissions: ['orders.read', 'orders.update', 'delivery.manage'],
    isSystem: true
  },
  {
    roleName: 'customer',
    description: 'Customer with basic ordering permissions',
    permissions: ['menu.read', 'orders.create', 'orders.read'],
    isSystem: true
  },
  {
    roleName: 'restaurant_staff',
    description: 'Restaurant staff with basic operational permissions',
    permissions: ['menu.read', 'orders.create', 'orders.read', 'orders.update', 'inventory.manage'],
    isSystem: true
  }
];

async function setupRBACDatabase() {
  try {
    console.log('🚀 Setting up RBAC database schema...');
    
    // Create collections
    for (const collection of collections) {
      console.log(`📁 Creating collection: ${collection.name}`);
      await appwrite.createCollection(collection.name, collection.attributes, collection.indexes);
    }
    
    // Create permissions
    console.log('🔐 Creating permissions...');
    for (const permission of permissions) {
      await appwrite.createPermission({
        permissionId: `perm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...permission,
        createdAt: new Date()
      });
    }
    
    // Create roles
    console.log('👥 Creating roles...');
    for (const role of roles) {
      await appwrite.createRole({
        roleId: `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log('✅ RBAC database setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Collections created: ${collections.length}`);
    console.log(`- Permissions created: ${permissions.length}`);
    console.log(`- Roles created: ${roles.length}`);
    console.log('\n🎯 Next steps:');
    console.log('1. Set up JWT secrets in environment variables');
    console.log('2. Implement authentication middleware');
    console.log('3. Create API endpoints for user management');
    
  } catch (error) {
    console.error('❌ Error setting up RBAC database:', error);
    process.exit(1);
  }
}

// Run the setup
setupRBACDatabase();
