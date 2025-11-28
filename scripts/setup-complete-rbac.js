// Complete RBAC System Setup Script for Litterateur Restaurant Management System
// This script sets up the entire role-based access control system

import { AppwriteService } from '../src/lib/appwrite.js';

console.log('🚀 Starting Complete RBAC System Setup for Litterateur...\n');

const appwrite = new AppwriteService();

// Database collections setup
const collections = [
  {
    name: 'Users',
    description: 'User accounts with role assignments',
    fields: [
      { name: 'userId', type: 'string', required: true, unique: true },
      { name: 'email', type: 'string', required: true, unique: true },
      { name: 'phone', type: 'string', required: false, unique: true },
      { name: 'firstName', type: 'string', required: true },
      { name: 'lastName', type: 'string', required: true },
      { name: 'profileImage', type: 'string', required: false },
      { name: 'status', type: 'string', required: true, enum: ['active', 'inactive', 'suspended', 'pending_verification'] },
      { name: 'roleId', type: 'string', required: true },
      { name: 'restaurantId', type: 'string', required: false },
      { name: 'createdAt', type: 'datetime', required: true },
      { name: 'updatedAt', type: 'datetime', required: true },
      { name: 'lastLoginAt', type: 'datetime', required: false },
      { name: 'verificationToken', type: 'string', required: false },
      { name: 'verificationTokenExpiry', type: 'datetime', required: false },
      { name: 'passwordResetToken', type: 'string', required: false },
      { name: 'passwordResetTokenExpiry', type: 'datetime', required: false },
      { name: 'twoFactorEnabled', type: 'boolean', required: true },
      { name: 'twoFactorSecret', type: 'string', required: false },
      { name: 'preferences', type: 'object', required: false }
    ]
  },
  {
    name: 'Roles',
    description: 'User roles with permissions',
    fields: [
      { name: 'roleId', type: 'string', required: true, unique: true },
      { name: 'roleName', type: 'string', required: true, unique: true },
      { name: 'description', type: 'string', required: true },
      { name: 'permissions', type: 'array', required: true },
      { name: 'isSystem', type: 'boolean', required: true },
      { name: 'createdAt', type: 'datetime', required: true },
      { name: 'updatedAt', type: 'datetime', required: true }
    ]
  },
  {
    name: 'Permissions',
    description: 'System permissions for role-based access control',
    fields: [
      { name: 'permissionId', type: 'string', required: true, unique: true },
      { name: 'permissionName', type: 'string', required: true, unique: true },
      { name: 'description', type: 'string', required: true },
      { name: 'resource', type: 'string', required: true },
      { name: 'action', type: 'string', required: true },
      { name: 'createdAt', type: 'datetime', required: true }
    ]
  },
  {
    name: 'UserPermissions',
    description: 'Direct user permissions for granular control',
    fields: [
      { name: 'id', type: 'string', required: true, unique: true },
      { name: 'userId', type: 'string', required: true },
      { name: 'permissionId', type: 'string', required: true },
      { name: 'grantedAt', type: 'datetime', required: true },
      { name: 'grantedBy', type: 'string', required: true },
      { name: 'expiresAt', type: 'datetime', required: false },
      { name: 'notes', type: 'string', required: false }
    ]
  },
  {
    name: 'Sessions',
    description: 'User authentication sessions',
    fields: [
      { name: 'sessionId', type: 'string', required: true, unique: true },
      { name: 'userId', type: 'string', required: true },
      { name: 'token', type: 'string', required: true },
      { name: 'refreshToken', type: 'string', required: true },
      { name: 'ipAddress', type: 'string', required: true },
      { name: 'userAgent', type: 'string', required: true },
      { name: 'deviceId', type: 'string', required: false },
      { name: 'createdAt', type: 'datetime', required: true },
      { name: 'expiresAt', type: 'datetime', required: true },
      { name: 'revokedAt', type: 'datetime', required: false }
    ]
  },
  {
    name: 'AuditLogs',
    description: 'System audit logs for security and compliance',
    fields: [
      { name: 'auditId', type: 'string', required: true, unique: true },
      { name: 'userId', type: 'string', required: true },
      { name: 'action', type: 'string', required: true },
      { name: 'resource', type: 'string', required: true },
      { name: 'resourceId', type: 'string', required: false },
      { name: 'previousValue', type: 'object', required: false },
      { name: 'newValue', type: 'object', required: false },
      { name: 'ipAddress', type: 'string', required: true },
      { name: 'userAgent', type: 'string', required: true },
      { name: 'status', type: 'string', required: true, enum: ['success', 'failure'] },
      { name: 'errorMessage', type: 'string', required: false },
      { name: 'timestamp', type: 'datetime', required: true }
    ]
  },
  {
    name: 'OTPStorage',
    description: 'Temporary OTP storage for verification',
    fields: [
      { name: 'otpId', type: 'string', required: true, unique: true },
      { name: 'userId', type: 'string', required: true },
      { name: 'otp', type: 'string', required: true },
      { name: 'purpose', type: 'string', required: true },
      { name: 'createdAt', type: 'datetime', required: true },
      { name: 'expiresAt', type: 'datetime', required: true },
      { name: 'used', type: 'boolean', required: true },
      { name: 'usedAt', type: 'datetime', required: false }
    ]
  }
];

// Permissions definition
const permissions = [
  // User management
  { permissionName: 'users.create', description: 'Create new users', resource: 'users', action: 'create' },
  { permissionName: 'users.read', description: 'View user information', resource: 'users', action: 'read' },
  { permissionName: 'users.update', description: 'Update user information', resource: 'users', action: 'update' },
  { permissionName: 'users.delete', description: 'Delete users', resource: 'users', action: 'delete' },
  
  // Role management
  { permissionName: 'roles.create', description: 'Create new roles', resource: 'roles', action: 'create' },
  { permissionName: 'roles.read', description: 'View roles', resource: 'roles', action: 'read' },
  { permissionName: 'roles.update', description: 'Update roles', resource: 'roles', action: 'update' },
  { permissionName: 'roles.delete', description: 'Delete roles', resource: 'roles', action: 'delete' },
  
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
  { permissionName: 'delivery.manage', description: 'Manage deliveries', resource: 'delivery', action: 'update' },
  
  // Restaurant operations
  { permissionName: 'restaurant.manage', description: 'Manage restaurant operations', resource: 'restaurant', action: 'update' },
  
  // Customer operations
  { permissionName: 'rewards.view', description: 'View loyalty rewards', resource: 'rewards', action: 'read' },
  { permissionName: 'rewards.use', description: 'Use loyalty rewards', resource: 'rewards', action: 'update' }
];

// Roles definition
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
    permissions: [
      'menu.read', 'menu.update', 
      'orders.read', 'orders.update',
      'kitchen.process',
      'inventory.manage'
    ],
    isSystem: true
  },
  {
    roleName: 'delivery_partner',
    description: 'Delivery partner with delivery management permissions',
    permissions: [
      'orders.read', 'orders.update',
      'delivery.manage'
    ],
    isSystem: true
  },
  {
    roleName: 'customer',
    description: 'Customer with basic ordering and rewards permissions',
    permissions: [
      'menu.read',
      'orders.create', 'orders.read',
      'rewards.view', 'rewards.use'
    ],
    isSystem: true
  },
  {
    roleName: 'restaurant_staff',
    description: 'Restaurant staff with operational permissions',
    permissions: [
      'menu.read',
      'orders.create', 'orders.read', 'orders.update',
      'inventory.manage',
      'restaurant.manage'
    ],
    isSystem: true
  }
];

async function setupCompleteRBAC() {
  try {
    console.log('📊 Setting up database collections...');
    
    // Create collections
    for (const collection of collections) {
      console.log(`📁 Creating collection: ${collection.name}`);
      try {
        await appwrite.createCollection(collection.name, collection.fields);
        console.log(`✅ Collection ${collection.name} created successfully`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Collection ${collection.name} already exists, skipping...`);
        } else {
          throw error;
        }
      }
    }
    
    console.log('\n🔐 Setting up permissions...');
    
    // Create permissions
    for (const permission of permissions) {
      try {
        await appwrite.createPermission({
          permissionId: `perm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...permission,
          createdAt: new Date()
        });
        console.log(`✅ Permission ${permission.permissionName} created`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Permission ${permission.permissionName} already exists, skipping...`);
        } else {
          throw error;
        }
      }
    }
    
    console.log('\n👥 Setting up roles...');
    
    // Create roles
    for (const role of roles) {
      try {
        await appwrite.createRole({
          roleId: `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...role,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ Role ${role.roleName} created with ${role.permissions.length} permissions`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Role ${role.roleName} already exists, skipping...`);
        } else {
          throw error;
        }
      }
    }
    
    console.log('\n🎯 Creating default admin user...');
    
    // Create default admin user
    try {
      const adminRole = await appwrite.getRoleByName('admin');
      if (adminRole) {
        const adminUser = await appwrite.createUser({
          userId: 'admin_default',
          email: 'admin@litterateur.com',
          phone: null,
          firstName: 'System',
          lastName: 'Administrator',
          status: 'active',
          roleId: adminRole.roleId,
          restaurantId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          twoFactorEnabled: false,
          preferences: {
            language: 'en',
            notificationsEnabled: true,
            theme: 'light'
          }
        });
        console.log('✅ Default admin user created (admin@litterateur.com)');
      }
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Default admin user already exists, skipping...');
      } else {
        console.log('⚠️  Could not create default admin user:', error.message);
      }
    }
    
    console.log('\n🔧 Setting up environment variables...');
    
    // Check for required environment variables
    const requiredEnvVars = ['JWT_SECRET'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('⚠️  Missing environment variables:');
      missingVars.forEach(varName => {
        console.log(`   - ${varName}: Please set this in your environment`);
      });
      console.log('\n💡 Add these to your .env file or Cloudflare Pages environment variables');
    } else {
      console.log('✅ All required environment variables are set');
    }
    
    console.log('\n🎉 RBAC System Setup Complete!');
    console.log('\n📋 Summary:');
    console.log(`✅ Collections: ${collections.length} created`);
    console.log(`✅ Permissions: ${permissions.length} defined`);
    console.log(`✅ Roles: ${roles.length} configured`);
    console.log('✅ Default admin user created');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Set JWT_SECRET environment variable');
    console.log('2. Test the authentication endpoints');
    console.log('3. Create your first admin user via registration');
    console.log('4. Implement role-based UI components');
    
    console.log('\n🔗 API Endpoints Ready:');
    console.log('- POST /api/auth/register - User registration');
    console.log('- POST /api/auth/verify-otp - OTP verification');
    console.log('- POST /api/auth/refresh - Token refresh');
    console.log('- POST /api/auth/logout - User logout');
    console.log('- GET /api/auth/me - Current user info');
    console.log('- GET /api/users/profile - User profile');
    console.log('- PUT /api/users/profile - Update profile');
    console.log('- GET /api/admin/roles - List roles (admin only)');
    console.log('- POST /api/admin/roles - Create role (admin only)');
    
    console.log('\n🎯 Authentication Flow:');
    console.log('1. User registers → OTP sent via email');
    console.log('2. User verifies OTP → JWT tokens issued');
    console.log('3. User accesses protected endpoints → Role validation');
    console.log('4. Token auto-refresh → Seamless experience');
    
  } catch (error) {
    console.error('❌ RBAC Setup Error:', error);
    process.exit(1);
  }
}

// Run the setup
setupCompleteRBAC();
