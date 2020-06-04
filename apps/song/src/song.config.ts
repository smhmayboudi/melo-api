import { SONG } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(SONG, () => ({
  ELASTICSEARCH_NODE: process.env.SONG_ELASTICSEARCH_NODE,
  IMAGE_PATH: process.env.SONG_IMAGE_PATH,
  IMAGE_PATH_DEFAULT_SONG: process.env.SONG_IMAGE_PATH_DEFAULT_SONG,
  INDEX_NAME: process.env.SONG_INDEX_NAME,
  MAX_SIZE: process.env.SONG_MAX_SIZE,
  MP3_ENDPOINT: process.env.SONG_MP3_ENDPOINT,
  SEND_TIMEOUT: process.env.SONG_SEND_TIMEOUT,
  SEND_URL: process.env.SONG_SEND_URL,
  TYPEORM_DATABASE: process.env.SONG_TYPEORM_DATABASE,
  TYPEORM_HOST: process.env.SONG_TYPEORM_HOST,
  TYPEORM_LOGGING: process.env.SONG_TYPEORM_LOGGING,
  TYPEORM_PASSWORD: process.env.SONG_TYPEORM_PASSWORD,
  TYPEORM_PORT: process.env.SONG_TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.SONG_TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME: process.env.SONG_TYPEORM_USERNAME,
}));
