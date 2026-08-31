import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const ADVERTISER_COOKIE_NAME = "kazanix_advertiser_session";

type AdvertiserSession = {
  id: string;
  email: string;
  name: string;
  role: "BUSINESS" | "ADMIN";
  exp: number;
};

function getSecret() {
  const secret =
    process.env.ADVERTISER_SESSION_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.DATABASE_URL;

  if (!secret) {
    throw new Error(
      "ADVERTISER_SESSION_SECRET veya AUTH_SECRET ayarlanmamis."
    );
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

export function createAdvertiserSession(
  user: {
    id: string;
    email: string;
    name: string;
    role: "BUSINESS" | "ADMIN";
  }
) {
  const payload: AdvertiserSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  const encoded = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  return `${encoded}.${sign(encoded)}`;
}

export function readAdvertiserSession(
  value?: string
): AdvertiserSession | null {
  try {
    if (!value) {
      return null;
    }

    const parts = value.split(".");

    if (parts.length !== 2) {
      return null;
    }

    const [encoded, signature] = parts;

    if (!safeEqual(signature, sign(encoded))) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as AdvertiserSession;

    if (!payload.id || !payload.email || !payload.exp) {
      return null;
    }

    if (payload.exp < Date.now()) {
      return null;
    }

    if (
      payload.role !== "BUSINESS" &&
      payload.role !== "ADMIN"
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdvertiser() {
  const cookieStore = await cookies();

  const session = readAdvertiserSession(
    cookieStore.get(ADVERTISER_COOKIE_NAME)?.value
  );

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    include: {
      business: true,
    },
  });

  if (!user) {
    return null;
  }

  if (
    user.role !== "BUSINESS" &&
    user.role !== "ADMIN"
  ) {
    return null;
  }

  return user;
}

export function unauthorized() {
  return new Response(
    JSON.stringify({
      error: "Reklam veren girisi gerekli.",
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}