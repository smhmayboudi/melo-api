import { CONST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(CONST, () => ({
  CACHE_HOST: process.env.CONST_CACHE_HOST,
  CACHE_MAX: process.env.CONST_CACHE_MAX,
  CACHE_PORT: process.env.CONST_CACHE_PORT,
  CACHE_STORE: process.env.CONST_CACHE_STORE,
  CACHE_TTL: process.env.CONST_CACHE_TTL,
  STATIC_IMAGE_PATHS: process.env.CONST_STATIC_IMAGE_PATHS,
}));
