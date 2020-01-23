import { registerAs } from "@nestjs/config";

export default registerAs("action", () => ({
  cacheHost: process.env.ACTION_CACHE_HOST,
  cacheMax: process.env.ACTION_CACHE_MAX,
  cachePort: process.env.ACTION_CACHE_PORT,
  cacheStore: process.env.ACTION_CACHE_STORE,
  cacheTTL: process.env.ACTION_CACHE_TTL
}));
