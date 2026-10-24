/**
 * Single source of truth for site URL and domain configuration.
 * Default fallback is https://noirscents.netlify.app as required in production.
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://noirscents.netlify.app"
).replace(/\/+$/, "");

/**
 * Returns an absolute URL based on SITE_URL.
 */
export function getAbsoluteUrl(path: string = ""): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
