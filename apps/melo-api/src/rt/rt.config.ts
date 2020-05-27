import { RT } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(RT, () => ({
  cacheHost: process.env.RT_CACHE_HOST,
  cacheMax: process.env.RT_CACHE_MAX,
  cachePort: process.env.RT_CACHE_PORT,
  cacheStore: process.env.RT_CACHE_STORE,
  cacheTTL: process.env.RT_CACHE_TTL,
}));
