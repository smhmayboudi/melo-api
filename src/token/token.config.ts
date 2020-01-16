import { registerAs } from "@nestjs/config";

export default registerAs("token", () => ({
  cacheHost: process.env.TOKEN_CACHE_HOST,
  cacheMax: process.env.TOKEN_CACHE_MAX,
  cachePort: process.env.TOKEN_CACHE_PORT,
  cacheTTL: process.env.TOKEN_CACHE_TTL
}));
