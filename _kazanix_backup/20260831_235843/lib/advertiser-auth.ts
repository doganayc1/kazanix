import { cookies } from "next/headers";

export const ADVERTISER_COOKIE_NAME = "kazanix_advertiser";

export async function getAdvertiserSession() {
  const cookieStore = await cookies();

  const value = cookieStore.get(
    ADVERTISER_COOKIE_NAME
  )?.value;

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(value, "base64url").toString("utf8")
    ) as {
      id: string;
      email: string;
      name: string;
    };
  } catch {
    return null;
  }
}