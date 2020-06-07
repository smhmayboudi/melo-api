import { SEARCH } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SEARCH, () => ({
  CACHE_HOST: process.env.SEARCH_CACHE_HOST,
  CACHE_MAX: process.env.SEARCH_CACHE_MAX,
  CACHE_PORT: process.env.SEARCH_CACHE_PORT,
  CACHE_STORE: process.env.SEARCH_CACHE_STORE,
  CACHE_TTL: process.env.SEARCH_CACHE_TTL,
}));
