import { registerAs } from "@nestjs/config";

export default registerAs("jwks", () => ({
  cacheHost: process.env.KEY_CACHE_HOST,
  cacheMax: process.env.KEY_CACHE_MAX,
  cachePort: process.env.KEY_CACHE_PORT,
  cacheTTL: process.env.KEY_CACHE_TTL
}));
