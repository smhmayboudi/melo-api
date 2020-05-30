import { SONG } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SONG, () => ({
  CACHE_HOST: process.env.SONG_CACHE_HOST,
  CACHE_MAX: process.env.SONG_CACHE_MAX,
  CACHE_PORT: process.env.SONG_CACHE_PORT,
  CACHE_STORE: process.env.SONG_CACHE_STORE,
  CACHE_TTL: process.env.SONG_CACHE_TTL,
  MAX_SIZE: process.env.SONG_MAX_SIZE,
  SEND_TIMEOUT: process.env.SONG_SEND_TIMEOUT,
  SEND_URL: process.env.SONG_SEND_URL,
}));
