import { SEARCH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SEARCH, () => ({
  ELASTICSEARCH_NODE: process.env.SEARCH_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.SEARCH_INDEX_NAME,
  MAX_SIZE: process.env.SEARCH_MAX_SIZE,
  SCRIPT_SCORE: process.env.SEARCH_SCRIPT_SCORE,
  SERVICE_PORT: process.env.SEARCH_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.SEARCH_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.SEARCH_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.SEARCH_SERVICE_URL,
  SUGGEST_INDEX: process.env.SEARCH_SUGGEST_INDEX,
}));
