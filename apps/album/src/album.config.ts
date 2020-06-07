import { ALBUM } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(ALBUM, () => ({
  ELASTICSEARCH_NODE: process.env.ALBUM_ELASTICSEARCH_NODE,
  IMAGE_PATH: process.env.ALBUM_IMAGE_PATH,
  IMAGE_PATH_DEFAULT: process.env.ALBUM_IMAGE_PATH_DEFAULT,
  INDEX_NAME: process.env.ALBUM_INDEX_NAME,
  MAX_SIZE: process.env.ALBUM_MAX_SIZE,
}));
