import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getKv(): Promise<CloudflareEnv["ANALYTICS_DATA_KV"] | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.ANALYTICS_DATA_KV ?? null;
  } catch {
    return null;
  }
}

export async function readKvJsonCache<T>(key: string): Promise<T | null> {
  const kv = await getKv();
  if (!kv) return null;

  const raw = await kv.get(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeKvJsonCache<T>(
  key: string,
  data: T
): Promise<boolean> {
  const kv = await getKv();
  if (!kv) return false;

  await kv.put(key, JSON.stringify(data));
  return true;
}
