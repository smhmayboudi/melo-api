import { registerAs } from "@nestjs/config";

export default registerAs("album", () => ({
  cacheHost: process.env.ALBUM_CACHE_HOST,
  cacheMax: process.env.ALBUM_CACHE_MAX,
  cachePort: process.env.ALBUM_CACHE_PORT,
  cacheStore: process.env.ALBUM_CACHE_STORE,
  cacheTTL: process.env.ALBUM_CACHE_TTL,
}));
