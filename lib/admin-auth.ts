import { cookies } from "next/headers";

const COOKIE_NAME = "kazanix_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return (
    cookieStore.get(COOKIE_NAME)?.value ===
    process.env.ADMIN_PASSWORD
  );
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
