import { registerAs } from "@nestjs/config";

export default registerAs("song", () => ({
  cacheHost: process.env.SONG_CACHE_HOST,
  cacheMax: process.env.SONG_CACHE_MAX,
  cachePort: process.env.SONG_CACHE_PORT,
  cacheStore: process.env.SONG_CACHE_STORE,
  cacheTTL: process.env.SONG_CACHE_TTL,
  timeout: process.env.DATA_TIMEOUT,
  uri: process.env.DATA_URI
}));
