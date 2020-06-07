import { PLAYLIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(PLAYLIST, () => ({
  CACHE_HOST: process.env.PLAYLIST_CACHE_HOST,
  CACHE_MAX: process.env.PLAYLIST_CACHE_MAX,
  CACHE_PORT: process.env.PLAYLIST_CACHE_PORT,
  CACHE_STORE: process.env.PLAYLIST_CACHE_STORE,
  CACHE_TTL: process.env.PLAYLIST_CACHE_TTL,
}));
