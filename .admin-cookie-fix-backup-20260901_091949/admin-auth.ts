import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "kazanix_admin";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET eksik veya cok kisa."
    );
  }

  return secret;
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);

  if (aa.length !== bb.length) {
    return false;
  }

  return crypto.timingSafeEqual(aa, bb);
}

export function createAdminSession() {
  const payload =
    `${Date.now()}:${crypto.randomBytes(24).toString("hex")}`;

  return `${payload}.${sign(payload)}`;
}

export function isAdminAuthenticated(
  cookieValue?: string
) {
  if (!cookieValue) {
    return false;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [payload, signature] = parts;

  if (!payload || !signature) {
    return false;
  }

  const timestamp = Number(
    payload.split(":")[0]
  );

  if (!Number.isFinite(timestamp)) {
    return false;
  }

  if (
    Date.now() - timestamp >
    MAX_AGE_SECONDS * 1000
  ) {
    return false;
  }

  try {
    return safeEqual(
      sign(payload),
      signature
    );
  } catch {
    return false;
  }
}
