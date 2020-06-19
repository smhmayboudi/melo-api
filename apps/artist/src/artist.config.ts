import { ARTIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ARTIST, () => ({
  IMAGE_PATH: process.env.ARTIST_IMAGE_PATH,
  IMAGE_PATH_DEFAULT: process.env.ARTIST_IMAGE_PATH_DEFAULT,
  INDEX_NAME: process.env.ARTIST_INDEX_NAME,
  MAX_SIZE: process.env.ARTIST_MAX_SIZE,
  SERVICE_PORT: process.env.ARTIST_SERVICE_PORT,
  SERVICE_RETRY_ATTEMPTS: process.env.ARTIST_SERVICE_RETRY_ATTEMPTS,
  SERVICE_RETRY_DELAY: process.env.ARTIST_SERVICE_RETRY_DELAY,
  SERVICE_URL: process.env.ARTIST_SERVICE_URL,
}));
