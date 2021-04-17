import { ACTION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ACTION, () => ({
  CACHE_HOST: process.env.ACTION_CACHE_HOST,
  CACHE_MAX: process.env.ACTION_CACHE_MAX,
  CACHE_PORT: process.env.ACTION_CACHE_PORT,
  CACHE_STORE: process.env.ACTION_CACHE_STORE,
  CACHE_TTL: process.env.ACTION_CACHE_TTL,
}));
