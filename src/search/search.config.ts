import { registerAs } from "@nestjs/config";

export default registerAs("search", () => ({
  cacheHost: process.env.SEARCH_CACHE_HOST,
  cacheMax: process.env.SEARCH_CACHE_MAX,
  cachePort: process.env.SEARCH_CACHE_PORT,
  cacheStore: process.env.SEARCH_CACHE_STORE,
  cacheTTL: process.env.SEARCH_CACHE_TTL,
  elasticNode: process.env.SEARCH_ELASTIC_NODE,
  elasticScriptScore: process.env.SEARCH_ELASTIC_SCRIPT_SCORE,
  index: process.env.SEARCH_INDEX_NAME,
  resultSize: process.env.SEARCH_RESULT_SIZE,
  suggestIndex: process.env.SEARCH_SUGGEST_INDEX_NAME,
}));
