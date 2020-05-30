import { JWKS } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(JWKS, () => ({
  CACHE_HOST: process.env.JWKS_CACHE_HOST,
  CACHE_MAX: process.env.JWKS_CACHE_MAX,
  CACHE_PORT: process.env.JWKS_CACHE_PORT,
  CACHE_STORE: process.env.JWKS_CACHE_STORE,
  CACHE_TTL: process.env.JWKS_CACHE_TTL,
}));
