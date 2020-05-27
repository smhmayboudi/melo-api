import { ARTIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ARTIST, () => ({
  cacheHost: process.env.ARTIST_CACHE_HOST,
  cacheMax: process.env.ARTIST_CACHE_MAX,
  cachePort: process.env.ARTIST_CACHE_PORT,
  cacheStore: process.env.ARTIST_CACHE_STORE,
  cacheTTL: process.env.ARTIST_CACHE_TTL,
  maxSize: process.env.ARTIST_MAX_SIZE,
}));
