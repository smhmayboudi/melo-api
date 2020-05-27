import { DATA } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(DATA, () => ({
  elasticNode: process.env.DATA_ELASTICSEARCH_NODE,
  imageBaseUrl: process.env.DATA_IMAGE_BASE_URL,
  imageEncode: process.env.DATA_IMAGE_ENCODE,
  imageKey: process.env.DATA_IMAGE_KEY,
  imagePath: process.env.DATA_IMAGE_PATH,
  imagePathDefaultAlbum: process.env.DATA_IMAGE_PATH_DEFAULT_ALBUM,
  imagePathDefaultArtist: process.env.DATA_IMAGE_PATH_DEFAULT_ARTIST,
  imagePathDefaultSong: process.env.DATA_IMAGE_PATH_DEFAULT_SONG,
  imageSalt: process.env.DATA_IMAGE_SALT,
  imageSignatureSize: process.env.DATA_IMAGE_SIGNATURE_SIZE,
  imageTypeSize: process.env.DATA_IMAGE_TYPE_SIZE,
  indexName: process.env.DATA_INDEX_NAME,
  maxSize: process.env.DATA_MAX_SIZE,
  mp3Endpoint: process.env.DATA_MP3_ENDPOINT,
  typeOrmDatabase: process.env.DATA_TYPEORM_DATABASE,
  typeOrmHost: process.env.DATA_TYPEORM_HOST,
  typeOrmLogging: process.env.DATA_TYPEORM_LOGGING,
  typeOrmPassword: process.env.DATA_TYPEORM_PASSWORD,
  typeOrmPort: process.env.DATA_TYPEORM_PORT,
  typeOrmSynchronize: process.env.DATA_TYPEORM_SYNCHRONIZE,
  typeOrmUsername: process.env.DATA_TYPEORM_USERNAME,
}));
