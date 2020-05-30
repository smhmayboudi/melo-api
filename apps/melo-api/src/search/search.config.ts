import { SEARCH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SEARCH, () => ({
  CACHE_HOST: process.env.SEARCH_CACHE_HOST,
  CACHE_MAX: process.env.SEARCH_CACHE_MAX,
  CACHE_PORT: process.env.SEARCH_CACHE_PORT,
  CACHE_STORE: process.env.SEARCH_CACHE_STORE,
  CACHE_TTL: process.env.SEARCH_CACHE_TTL,
  ELASTICSEARCH_NODE: process.env.SEARCH_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.SEARCH_INDEX_NAME,
  MAX_SIZE: process.env.SEARCH_MAX_SIZE,
  SCRIPT_SCORE: process.env.SEARCH_SCRIPT_SCORE,
}));
