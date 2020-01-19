import { registerAs } from "@nestjs/config";

export default registerAs("song", () => ({
  cacheHost: process.env.SONG_CACHE_HOST,
  cacheMax: process.env.SONG_CACHE_MAX,
  cachePort: process.env.SONG_CACHE_PORT,
  cacheTTL: process.env.SONG_CACHE_TTL
}));
