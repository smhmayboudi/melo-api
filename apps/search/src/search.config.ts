import { SEARCH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SEARCH, () => ({
  ELASTICSEARCH_NODE: process.env.SEARCH_ELASTICSEARCH_NODE,
  INDEX_NAME: process.env.SEARCH_INDEX_NAME,
  MAX_SIZE: process.env.SEARCH_MAX_SIZE,
  SCRIPT_SCORE: process.env.SEARCH_SCRIPT_SCORE,
}));
