import { registerAs } from "@nestjs/config";

export default registerAs("artist", () => ({
  cacheHost: process.env.ARTIST_CACHE_HOST,
  cacheMax: process.env.ARTIST_CACHE_MAX,
  cachePort: process.env.ARTIST_CACHE_PORT,
  cacheTTL: process.env.ARTIST_CACHE_TTL
}));
