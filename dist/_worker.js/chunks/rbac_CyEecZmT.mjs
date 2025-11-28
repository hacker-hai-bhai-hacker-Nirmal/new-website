globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware } from './index_BWlpe_dD.mjs';
import { s as sessionManager } from './sessionManager_C6n_ySBK.mjs';

const authMiddleware = defineMiddleware(async (context, next) => {
  const authHeader = context.request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Authorization header required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const token = authHeader.slice(7);
  try {
    const user = await sessionManager.validateAccessToken(token);
    context.locals.user = user;
    context.locals.isAuthenticated = true;
    return next();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
});
function requireRole(...allowedRoles) {
  return async (context, next) => {
    if (!context.locals.isAuthenticated || !context.locals.user) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const userRole = context.locals.user.role;
    if (!allowedRoles.includes(userRole)) {
      return new Response(
        JSON.stringify({
          error: "Insufficient permissions",
          required: allowedRoles,
          current: userRole
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    return next();
  };
}

export { authMiddleware as a, requireRole as r };
