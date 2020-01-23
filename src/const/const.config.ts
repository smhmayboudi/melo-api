import { registerAs } from "@nestjs/config";

export default registerAs("const", () => ({
  cacheHost: process.env.CONST_CACHE_HOST,
  cacheMax: process.env.CONST_CACHE_MAX,
  cachePort: process.env.CONST_CACHE_PORT,
  cacheStore: process.env.CONST_CACHE_STORE,
  cacheTTL: process.env.CONST_CACHE_TTL
}));
