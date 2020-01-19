import { registerAs } from "@nestjs/config";

export default registerAs("search", () => ({
  cacheHost: process.env.SEARCH_CACHE_HOST,
  cacheMax: process.env.SEARCH_CACHE_MAX,
  cachePort: process.env.SEARCH_CACHE_PORT,
  cacheTTL: process.env.SEARCH_CACHE_TTL
}));
