import { registerAs } from "@nestjs/config";

export default registerAs("file", () => ({
  cacheHost: process.env.FILE_CACHE_HOST,
  cacheMax: process.env.FILE_CACHE_MAX,
  cachePort: process.env.FILE_CACHE_PORT,
  cacheTTL: process.env.FILE_CACHE_TTL,
  s3AccessKeyId: process.env.FILE_S3_ACCESS_KEY_ID,
  s3Bucket: process.env.FILE_S3_BUCKET,
  s3Endpoint: process.env.FILE_S3_ENDPOINT,
  s3SecretAccessKey: process.env.FILE_S3_SECRET_ACCESS_KEY,
  s3SslEnabled: process.env.FILE_S3_SSL_ENABLED
}));
