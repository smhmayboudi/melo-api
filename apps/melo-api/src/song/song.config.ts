import { SONG } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SONG, () => ({
  cacheHost: process.env.SONG_CACHE_HOST,
  cacheMax: process.env.SONG_CACHE_MAX,
  cachePort: process.env.SONG_CACHE_PORT,
  cacheStore: process.env.SONG_CACHE_STORE,
  cacheTTL: process.env.SONG_CACHE_TTL,
  maxSize: process.env.SONG_MAX_SIZE,
  timeout: process.env.SONG_SEND_TIMEOUT,
  url: process.env.SONG_SEND_URL,
}));
