import { PLAYLIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(PLAYLIST, () => ({
  IMAGE_PATH: process.env.PLAYLIST_IMAGE_PATH,
  IMAGE_PATH_DEFAULT_PLAYLIST: process.env.PLAYLIST_IMAGE_PATH_DEFAULT_PLAYLIST,
}));
