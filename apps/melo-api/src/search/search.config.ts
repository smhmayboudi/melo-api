import { SEARCH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SEARCH, () => ({
  cacheHost: process.env.SEARCH_CACHE_HOST,
  cacheMax: process.env.SEARCH_CACHE_MAX,
  cachePort: process.env.SEARCH_CACHE_PORT,
  cacheStore: process.env.SEARCH_CACHE_STORE,
  cacheTTL: process.env.SEARCH_CACHE_TTL,
  elasticNode: process.env.SEARCH_ELASTICSEARCH_NODE,
  indexName: process.env.SEARCH_INDEX_NAME,
  maxSize: process.env.SEARCH_MAX_SIZE,
  scriptScore: process.env.SEARCH_SCRIPT_SCORE,
}));
