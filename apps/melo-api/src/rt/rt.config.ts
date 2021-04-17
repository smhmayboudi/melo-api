import { RT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RT, () => ({
  CACHE_HOST: process.env.RT_CACHE_HOST,
  CACHE_MAX: process.env.RT_CACHE_MAX,
  CACHE_PORT: process.env.RT_CACHE_PORT,
  CACHE_STORE: process.env.RT_CACHE_STORE,
  CACHE_TTL: process.env.RT_CACHE_TTL,
}));
