import { RELATION } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RELATION, () => ({
  CACHE_HOST: process.env.RELATION_CACHE_HOST,
  CACHE_MAX: process.env.RELATION_CACHE_MAX,
  CACHE_PORT: process.env.RELATION_CACHE_PORT,
  CACHE_STORE: process.env.RELATION_CACHE_STORE,
  CACHE_TTL: process.env.RELATION_CACHE_TTL,
}));
