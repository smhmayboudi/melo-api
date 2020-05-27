import { CONST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(CONST, () => ({
  cacheHost: process.env.CONST_CACHE_HOST,
  cacheMax: process.env.CONST_CACHE_MAX,
  cachePort: process.env.CONST_CACHE_PORT,
  cacheStore: process.env.CONST_CACHE_STORE,
  cacheTTL: process.env.CONST_CACHE_TTL,
  staticImagePaths: process.env.CONST_STATIC_IMAGE_PATHS,
}));
