import { ARTIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ARTIST, () => ({
  CACHE_HOST: process.env.ARTIST_CACHE_HOST,
  CACHE_MAX: process.env.ARTIST_CACHE_MAX,
  CACHE_PORT: process.env.ARTIST_CACHE_PORT,
  CACHE_STORE: process.env.ARTIST_CACHE_STORE,
  CACHE_TTL: process.env.ARTIST_CACHE_TTL,
  MAX_SIZE: process.env.ARTIST_MAX_SIZE,
}));
