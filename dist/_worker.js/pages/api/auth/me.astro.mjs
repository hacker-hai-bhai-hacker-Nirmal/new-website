globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AppwriteService } from '../../../chunks/sessionManager_Bzw4u138.mjs';
import { a as authMiddleware } from '../../../chunks/rbac_DSXUKwNO.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET({ request, locals }) {
  try {
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult;
    }
    const user = locals.user;
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not authenticated"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const appwrite = new AppwriteService();
    const fullUser = await appwrite.getUser(user.userId);
    if (!fullUser) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found"
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const role = await appwrite.getRole(fullUser.roleId);
    if (!role) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User role not found"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const {
      verificationToken,
      verificationTokenExpiry,
      passwordResetToken,
      passwordResetTokenExpiry,
      twoFactorSecret,
      ...safeUser
    } = fullUser;
    const response = {
      success: true,
      user: {
        ...safeUser,
        role: role.roleName,
        permissions: role.permissions || [],
        lastLoginAt: safeUser.lastLoginAt ? new Date(safeUser.lastLoginAt).toISOString() : void 0,
        createdAt: new Date(safeUser.createdAt).toISOString()
      }
    };
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to fetch user information"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function POST() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
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
