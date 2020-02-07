import { registerAs } from "@nestjs/config";

export default registerAs("song", () => ({
  cacheHost: process.env.SONG_CACHE_HOST,
  cacheMax: process.env.SONG_CACHE_MAX,
  cachePort: process.env.SONG_CACHE_PORT,
  cacheStore: process.env.SONG_CACHE_STORE,
  cacheTTL: process.env.SONG_CACHE_TTL,
  sendTelegramUrl: process.env.SONG_SEND_TELEGRAM_URL,
  sendTelegramTimeout: process.env.SONG_SEND_TELEGRAM_TIMEOUT
}));
