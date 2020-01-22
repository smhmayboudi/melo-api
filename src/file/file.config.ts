import { registerAs } from "@nestjs/config";

export default registerAs("file", () => ({
  cacheHost: process.env.FILE_CACHE_HOST,
  cacheMax: process.env.FILE_CACHE_MAX,
  cachePort: process.env.FILE_CACHE_PORT,
  cacheTTL: process.env.FILE_CACHE_TTL,
  storage: process.env.FILE_STORAGE,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: `${process.env.S3_ENDPOINT}:${process.env.S3_PORT}`,
  sslEnabled: process.env.S3_USE_SSL,
  storageMiscBucket: process.env.S3_STORAGE_MISC_BUCKET,
}));
