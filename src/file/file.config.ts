import { registerAs } from "@nestjs/config";

export default registerAs("file", () => ({
  cacheHost: process.env.FILE_CACHE_HOST,
  cacheMax: process.env.FILE_CACHE_MAX,
  cachePort: process.env.FILE_CACHE_PORT,
  cacheTTL: process.env.FILE_CACHE_TTL,
  storage: process.env.FILE_STORAGE
}));
