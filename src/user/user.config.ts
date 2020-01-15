import { registerAs } from "@nestjs/config";

export default registerAs("user", () => ({
  cacheHost: process.env.USER_CACHE_HOST,
  cacheMax: process.env.USER_CACHE_MAX,
  cachePort: process.env.USER_CACHE_PORT,
  cacheTTL: process.env.USER_CACHE_TTL
}));
