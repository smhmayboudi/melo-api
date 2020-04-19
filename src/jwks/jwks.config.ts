import { registerAs } from "@nestjs/config";

export default registerAs("jwks", () => ({
  cacheHost: process.env.JWKS_CACHE_HOST,
  cacheMax: process.env.JWKS_CACHE_MAX,
  cachePort: process.env.JWKS_CACHE_PORT,
  cacheStore: process.env.JWKS_CACHE_STORE,
  cacheTTL: process.env.JWKS_CACHE_TTL,
}));
