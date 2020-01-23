import { registerAs } from "@nestjs/config";

export default registerAs("at", () => ({
  cacheHost: process.env.AT_CACHE_HOST,
  cacheMax: process.env.AT_CACHE_MAX,
  cachePort: process.env.AT_CACHE_PORT,
  cacheStore: process.env.AT_CACHE_STORE,
  cacheTTL: process.env.AT_CACHE_TTL
}));
