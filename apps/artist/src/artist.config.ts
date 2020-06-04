import { ARTIST } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ARTIST, () => ({
  IMAGE_PATH: process.env.ARTIST_IMAGE_PATH,
  IMAGE_PATH_DEFAULT_ARTIST: process.env.ARTIST_IMAGE_PATH_DEFAULT_ARTIST,
  INDEX_NAME: process.env.ARTIST_INDEX_NAME,
  MAX_SIZE: process.env.ARTIST_MAX_SIZE,
}));
