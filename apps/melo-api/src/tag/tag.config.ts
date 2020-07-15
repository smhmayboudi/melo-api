import { TAG } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(TAG, () => ({
  CACHE_HOST: process.env.TAG_CACHE_HOST,
  CACHE_MAX: process.env.TAG_CACHE_MAX,
  CACHE_PORT: process.env.TAG_CACHE_PORT,
  CACHE_STORE: process.env.TAG_CACHE_STORE,
  CACHE_TTL: process.env.TAG_CACHE_TTL,
}));
