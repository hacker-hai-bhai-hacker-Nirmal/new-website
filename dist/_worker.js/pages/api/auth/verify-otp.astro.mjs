globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AppwriteService, s as sessionManager } from '../../../chunks/sessionManager_C6n_ySBK.mjs';
import { o as otpService } from '../../../chunks/otpService_C3WRlkYI.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  try {
    const body = await request.json();
    const { email, otp, otpToken, userId } = body;
    if (!email && !userId || !otp || !otpToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email (or userId), OTP, and OTP token are required"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const otpVerification = await otpService.verifyOTP({
      email: email || "",
      // Will be validated in JWT token
      otp,
      otpToken
    });
    if (!otpVerification.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpVerification.error || "Invalid or expired OTP"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const appwrite = new AppwriteService();
    let user;
    if (email) {
      user = await appwrite.getUserByEmail(email);
    } else if (userId) {
      user = await appwrite.getUser(userId);
    }
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found"
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const role = await appwrite.getRole(user.roleId);
    if (!role) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User role not found"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    await appwrite.updateUser(user.userId, {
      status: "active",
      updatedAt: /* @__PURE__ */ new Date()
    });
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const sessionResult = await sessionManager.createSession(
      user.userId,
      clientIP,
      userAgent
    );
    if (!sessionResult.accessToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create session"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    try {
      if (typeof appwrite.logAuditEvent === "function") {
        await appwrite.logAuditEvent({
          userId: user.userId,
          action: "OTP_VERIFICATION_SUCCESS",
          resource: "auth",
          details: {
            email: user.email,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
      } else {
        console.log("OTP verification successful:", {
          userId: user.userId,
          email: user.email,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    } catch (logError) {
      console.warn("Failed to log audit event:", logError);
    }
    return new Response(
      JSON.stringify({
        success: true,
        accessToken: sessionResult.accessToken,
        refreshToken: sessionResult.refreshToken,
        expiresIn: sessionResult.expiresIn,
        user: {
          userId: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: role.roleName,
          permissions: role.permissions
        },
        message: "OTP verified successfully! You are now logged in."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "OTP verification failed. Please try again."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function GET() {
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
