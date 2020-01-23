import { registerAs } from "@nestjs/config";

export default registerAs("telegram", () => ({
  cacheHost: process.env.TELEGRAM_CACHE_HOST,
  cacheMax: process.env.TELEGRAM_CACHE_MAX,
  cachePort: process.env.TELEGRAM_CACHE_PORT,
  cacheStore: process.env.TELEGRAM_CACHE_STORE,
  cacheTTL: process.env.TELEGRAM_CACHE_TTL
}));
