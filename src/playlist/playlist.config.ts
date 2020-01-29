import { registerAs } from "@nestjs/config";

export default registerAs("playlist", () => ({
  cacheHost: process.env.PLAYLIST_CACHE_HOST,
  cacheMax: process.env.PLAYLIST_CACHE_MAX,
  cachePort: process.env.PLAYLIST_CACHE_PORT,
  cacheStore: process.env.PLAYLIST_CACHE_STORE,
  cacheTTL: process.env.PLAYLIST_CACHE_TTL,
  defaultImagePath: process.env.PLAYLIST_DEFAULT_IMAGE_PATH,
  imagePath: process.env.PLAYLIST_IMAGE_PATH
}));
