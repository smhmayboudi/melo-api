import { registerAs } from "@nestjs/config";

export default registerAs("const", () => ({
  cacheHost: process.env.CONST_CACHE_HOST,
  cacheMax: process.env.CONST_CACHE_MAX,
  cachePort: process.env.CONST_CACHE_PORT,
  cacheStore: process.env.CONST_CACHE_STORE,
  cacheTTL: process.env.CONST_CACHE_TTL,
  staticImageUrl: process.env.STATIC_IMAGES_URL,
  imageTypeSize: process.env.IMAGES_TYPE_SIZE
}));
