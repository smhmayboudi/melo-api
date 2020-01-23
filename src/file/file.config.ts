import { registerAs } from "@nestjs/config";

export default registerAs("file", () => ({
  accessKeyId: process.env.FILE_ACCESS_KEY_ID,
  bucket: process.env.FILE_BUCKET,
  cacheHost: process.env.FILE_CACHE_HOST,
  cacheMax: process.env.FILE_CACHE_MAX,
  cachePort: process.env.FILE_CACHE_PORT,
  cacheTTL: process.env.FILE_CACHE_TTL,
  endpoint: process.env.FILE_ENDPOINT,
  secretAccessKey: process.env.FILE_SECRET_ACCESS_KEY,
  sslEnabled: process.env.FILE_SSL_ENABLED
}));
