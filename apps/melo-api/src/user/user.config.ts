import { USER } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(USER, () => ({
  CACHE_HOST: process.env.USER_CACHE_HOST,
  CACHE_MAX: process.env.USER_CACHE_MAX,
  CACHE_PORT: process.env.USER_CACHE_PORT,
  CACHE_STORE: process.env.USER_CACHE_STORE,
  CACHE_TTL: process.env.USER_CACHE_TTL,
}));
