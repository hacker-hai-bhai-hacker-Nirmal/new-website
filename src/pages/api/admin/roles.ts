// Role Management API Endpoint
// GET /api/admin/roles - List all roles
// POST /api/admin/roles - Create new role
// PUT /api/admin/roles/:roleId - Update role
// DELETE /api/admin/roles/:roleId - Delete role

import { AppwriteService } from '../../../lib/appwriteService.js';
import { authMiddleware, requireRole } from '../../../middleware/rbac.js';

interface RoleResponse {
  success: boolean;
  roles?: any[];
  role?: any;
  error?: string;
  message?: string;
}

export async function GET({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    // Apply authentication and role middleware
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult as Response;
    }

    const roleResult = await requireRole('admin')(context, async () => new Response(JSON.stringify({ success: true })));
    if (roleResult.status !== 200) {
      return roleResult as Response;
    }

    const appwrite = new AppwriteService();
    const roles = await appwrite.getAllRoles();

    const response: RoleResponse = {
      success: true,
      roles: roles.map((role: any) => ({
        roleId: role.roleId,
        roleName: role.roleName,
        description: role.description,
        permissions: role.permissions,
        isSystem: role.isSystem,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt
      }))
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error fetching roles:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to fetch roles' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    // Apply authentication and role middleware
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult as Response;
    }

    const roleResult = await requireRole('admin')(context, async () => new Response(JSON.stringify({ success: true })));
    if (roleResult.status !== 200) {
      return roleResult as Response;
    }

    const body = await request.json();
    const { roleName, description, permissions } = body;

    if (!roleName || !description || !permissions) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: roleName, description, permissions' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate role name uniqueness
    const appwrite = new AppwriteService();
    const existingRole = await appwrite.getRoleByName(roleName);
    
    if (existingRole) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Role with this name already exists' 
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate permissions
    const allPermissions = await appwrite.getAllPermissions();
    const validPermissions = allPermissions.map(p => p.permissionName);
    const invalidPermissions = permissions.filter((p: any) => !validPermissions.includes(p));
    
    if (invalidPermissions.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Invalid permissions: ${invalidPermissions.join(', ')}` 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newRole = await appwrite.createRole({
      roleId: `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roleName,
      description,
      permissions,
      isSystem: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const response: RoleResponse = {
      success: true,
      role: newRole,
      message: 'Role created successfully'
    };

    return new Response(
      JSON.stringify(response),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error creating role:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to create role' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle PUT and DELETE with dynamic routing would require additional setup
// For now, these methods return not allowed
export async function PUT(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function DELETE(): Promise<Response> {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
