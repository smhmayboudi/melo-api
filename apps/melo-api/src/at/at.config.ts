import { AT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(AT, () => ({
  CACHE_HOST: process.env.AT_CACHE_HOST,
  CACHE_MAX: process.env.AT_CACHE_MAX,
  CACHE_PORT: process.env.AT_CACHE_PORT,
  CACHE_STORE: process.env.AT_CACHE_STORE,
  CACHE_TTL: process.env.AT_CACHE_TTL,
}));
