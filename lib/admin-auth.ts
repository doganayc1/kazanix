import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "kazanix_admin";

type AdminSession = {
  role: "ADMIN";
  exp: number;
};

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET veya ADMIN_PASSWORD ayarlanmamis.");
  }

  return secret;
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function createAdminSession() {
  const payload: AdminSession = {
    role: "ADMIN",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  const encoded = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  return `${encoded}.${sign(encoded)}`;
}

export function isAdminAuthenticated(
  cookieValue?: string
) {
  try {
    if (!cookieValue) {
      return false;
    }

    const parts = cookieValue.split(".");

    if (parts.length !== 2) {
      return false;
    }

    const [encoded, signature] = parts;

    if (!safeEqual(signature, sign(encoded))) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as AdminSession;

    return (
      payload.role === "ADMIN" &&
      typeof payload.exp === "number" &&
      payload.exp > Date.now()
    );
  } catch {
    return false;
  }
}