import { PLAYLIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(PLAYLIST, () => ({
  IMAGE_PATH: process.env.PLAYLIST_IMAGE_PATH,
  IMAGE_PATH_DEFAULT: process.env.PLAYLIST_IMAGE_PATH_DEFAULT,
  MONGOOSE_RETRY_ATTEMPTS: process.env.PLAYLIST_MONGOOSE_RETRY_ATTEMPTS,
  MONGOOSE_RETRY_DELAY: process.env.PLAYLIST_MONGOOSE_RETRY_DELAY,
  MONGOOSE_URI: process.env.PLAYLIST_MONGOOSE_URI,
}));
