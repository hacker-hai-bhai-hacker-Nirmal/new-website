globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as authMiddleware, A as AppwriteService } from '../../../chunks/rbac_Cb_EpJZR.mjs';
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
        role: role?.roleName,
        permissions: role?.permissions || [],
        lastLoginAt: safeUser.lastLoginAt ? new Date(safeUser.lastLoginAt).toISOString() : void 0,
        createdAt: new Date(safeUser.createdAt).toISOString(),
        updatedAt: new Date(safeUser.updatedAt).toISOString()
      }
    };
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to fetch user profile"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function PUT({ request, locals }) {
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
    const updates = await request.json();
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const allowedFields = ["firstName", "lastName", "profileImage", "preferences"];
    const isAdmin = user.role === "admin";
    if (!isAdmin) {
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([key]) => allowedFields.includes(key))
      );
      if (filteredUpdates.preferences) {
        const { preferences } = filteredUpdates;
        if (typeof preferences !== "object" || preferences === null) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Invalid preferences format"
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        const validPreferenceKeys = ["language", "notificationsEnabled", "theme"];
        const invalidKeys = Object.keys(preferences).filter((key) => !validPreferenceKeys.includes(key));
        if (invalidKeys.length > 0) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `Invalid preference fields: ${invalidKeys.join(", ")}`
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
      }
      Object.assign(updates, filteredUpdates);
    }
    const appwrite = new AppwriteService();
    const previousData = await appwrite.getUser(user.userId);
    if (!previousData) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found"
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const updatedUser = await appwrite.updateUser(user.userId, {
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    });
    await appwrite.createAuditLog({
      auditId: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.userId,
      action: "profile_updated",
      resource: "users",
      resourceId: user.userId,
      previousValue: {
        firstName: previousData.firstName,
        lastName: previousData.lastName,
        preferences: previousData.preferences
      },
      newValue: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        preferences: updatedUser.preferences
      },
      ipAddress,
      userAgent,
      status: "success",
      timestamp: /* @__PURE__ */ new Date()
    });
    const {
      verificationToken,
      verificationTokenExpiry,
      passwordResetToken,
      passwordResetTokenExpiry,
      twoFactorSecret,
      ...safeUser
    } = updatedUser;
    const response = {
      success: true,
      user: safeUser,
      message: "Profile updated successfully"
    };
    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to update user profile"
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
