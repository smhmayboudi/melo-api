import { PLAYLIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(PLAYLIST, () => ({
  IMAGE_PATH: process.env.PLAYLIST_IMAGE_PATH,
  IMAGE_PATH_DEFAULT: process.env.PLAYLIST_IMAGE_PATH_DEFAULT,
  MANGOOSE_RETRY_ATTEMPTS: process.env.PLAYLIST_MANGOOSE_RETRY_ATTEMPTS,
  MANGOOSE_RETRY_DELAY: process.env.PLAYLIST_MANGOOSE_RETRY_DELAY,
  MANGOOSE_URI: process.env.PLAYLIST_MANGOOSE_URI,
}));
