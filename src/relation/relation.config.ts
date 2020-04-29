import { registerAs } from "@nestjs/config";

export default registerAs("relation", () => ({
  cacheHost: process.env.RELATION_CACHE_HOST,
  cacheMax: process.env.RELATION_CACHE_MAX,
  cachePort: process.env.RELATION_CACHE_PORT,
  cacheStore: process.env.RELATION_CACHE_STORE,
  cacheTTL: process.env.RELATION_CACHE_TTL,
}));
