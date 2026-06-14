declare global {
  interface CloudflareEnv {
    ANALYTICS_DATA_KV?: {
      get(key: string): Promise<string | null>;
      put(key: string, value: string): Promise<void>;
    };
  }
}

export {};
