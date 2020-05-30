import { DATA } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DATA, () => ({
  ELASTICSEARCH_NODE: process.env.DATA_ELASTICSEARCH_NODE,
  IMAGE_BASE_URL: process.env.DATA_IMAGE_BASE_URL,
  IMAGE_ENCODE: process.env.DATA_IMAGE_ENCODE,
  IMAGE_KEY: process.env.DATA_IMAGE_KEY,
  IMAGE_PATH: process.env.DATA_IMAGE_PATH,
  IMAGE_PATH_DEFAULT_ALBUM: process.env.DATA_IMAGE_PATH_DEFAULT_ALBUM,
  IMAGE_PATH_DEFAULT_ARTIST: process.env.DATA_IMAGE_PATH_DEFAULT_ARTIST,
  IMAGE_PATH_DEFAULT_SONG: process.env.DATA_IMAGE_PATH_DEFAULT_SONG,
  IMAGE_SALT: process.env.DATA_IMAGE_SALT,
  IMAGE_SIGNATURE_SIZE: process.env.DATA_IMAGE_SIGNATURE_SIZE,
  IMAGE_TYPE_SIZE: process.env.DATA_IMAGE_TYPE_SIZE,
  INDEX_NAME: process.env.DATA_INDEX_NAME,
  MAX_SIZE: process.env.DATA_MAX_SIZE,
  MP3_ENDPOINT: process.env.DATA_MP3_ENDPOINT,
  TYPEORM_DATABASE: process.env.DATA_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.DATA_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.DATA_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.DATA_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.DATA_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.DATA_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.DATA_TYPEORM_USERNAME,
}));
