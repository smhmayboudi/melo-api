import { PLAYLIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(PLAYLIST, () => ({
  cacheHost: process.env.PLAYLIST_CACHE_HOST,
  cacheMax: process.env.PLAYLIST_CACHE_MAX,
  cachePort: process.env.PLAYLIST_CACHE_PORT,
  cacheStore: process.env.PLAYLIST_CACHE_STORE,
  cacheTTL: process.env.PLAYLIST_CACHE_TTL,
  imagePath: process.env.PLAYLIST_IMAGE_PATH,
  imagePathDefaultPlaylist: process.env.PLAYLIST_IMAGE_PATH_DEFAULT_PLAYLIST,
}));
