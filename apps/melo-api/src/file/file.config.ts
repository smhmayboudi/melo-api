import { FILE } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(FILE, () => ({
  CACHE_HOST: process.env.FILE_CACHE_HOST,
  CACHE_MAX: process.env.FILE_CACHE_MAX,
  CACHE_PORT: process.env.FILE_CACHE_PORT,
  CACHE_STORE: process.env.FILE_CACHE_STORE,
  CACHE_TTL: process.env.FILE_CACHE_TTL,
  S3_ACCESS_KEY_ID: process.env.FILE_S3_ACCESS_KEY_ID,
  S3_BUCKET: process.env.FILE_S3_BUCKET,
  S3_ENDPOINT: process.env.FILE_S3_ENDPOINT,
  S3_FORCE_PATH_STYLE: process.env.FILE_S3_FORCE_PATH_STYLE,
  S3_SECRET_ACCESS_KEY: process.env.FILE_S3_SECRET_ACCESS_KEY,
  S3_SSL_ENABLED: process.env.FILE_S3_SSL_ENABLED,
}));
