import { registerAs } from "@nestjs/config";

export default registerAs("playlist", () => ({
  cacheHost: process.env.PLAYLIST_CACHE_HOST,
  cacheMax: process.env.PLAYLIST_CACHE_MAX,
  cachePort: process.env.PLAYLIST_CACHE_PORT,
  cacheTTL: process.env.PLAYLIST_CACHE_TTL
}));
