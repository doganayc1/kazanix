export const ADMIN_COOKIE_NAME = "kazanix_admin";

export function isAdminAuthenticated(
  cookieValue?: string
) {
  const password = process.env.ADMIN_PASSWORD;

  if (!password || !cookieValue) {
    return false;
  }

  return cookieValue === password;
}