/** Base URL for the main Digital Dashboard platform (separate deployment). */
export function getPlatformAppUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_PLATFORM_URL ??
    process.env.PLATFORM_APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL;

  if (raw) return raw.replace(/\/$/, "");

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://digitaltest.zach-a56.workers.dev";
}

export function platformHref(path: string, baseUrl?: string): string {
  const root = baseUrl ?? getPlatformAppUrl();
  if (path === "/") return root;
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
}
