globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as authMiddleware, r as requireRole, A as AppwriteService } from '../../../chunks/rbac_Cb_EpJZR.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET({ request, locals }) {
  try {
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult;
    }
    const roleResult = await requireRole("admin")(context, async () => new Response(JSON.stringify({ success: true })));
    if (roleResult.status !== 200) {
      return roleResult;
    }
    const appwrite = new AppwriteService();
    const roles = await appwrite.getAllRoles();
    const response = {
      success: true,
      roles: roles.map((role) => ({
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
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching roles:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to fetch roles"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function POST({ request, locals }) {
  try {
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult;
    }
    const roleResult = await requireRole("admin")(context, async () => new Response(JSON.stringify({ success: true })));
    if (roleResult.status !== 200) {
      return roleResult;
    }
    const body = await request.json();
    const { roleName, description, permissions } = body;
    if (!roleName || !description || !permissions) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: roleName, description, permissions"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const appwrite = new AppwriteService();
    const existingRole = await appwrite.getRoleByName(roleName);
    if (existingRole) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Role with this name already exists"
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    const allPermissions = await appwrite.getAllPermissions();
    const validPermissions = allPermissions.map((p) => p.permissionName);
    const invalidPermissions = permissions.filter((p) => !validPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid permissions: ${invalidPermissions.join(", ")}`
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newRole = await appwrite.createRole({
      roleId: `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roleName,
      description,
      permissions,
      isSystem: false,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    const response = {
      success: true,
      role: newRole,
      message: "Role created successfully"
    };
    return new Response(
      JSON.stringify(response),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating role:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to create role"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function PUT() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function DELETE() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
