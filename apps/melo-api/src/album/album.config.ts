import { ALBUM } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ALBUM, () => ({
  CACHE_HOST: process.env.ALBUM_CACHE_HOST,
  CACHE_MAX: process.env.ALBUM_CACHE_MAX,
  CACHE_PORT: process.env.ALBUM_CACHE_PORT,
  CACHE_STORE: process.env.ALBUM_CACHE_STORE,
  CACHE_TTL: process.env.ALBUM_CACHE_TTL,
}));
