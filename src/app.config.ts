import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  cacheEnable: process.env.APP_CACHE_ENABLE,
  cacheHost: process.env.APP_CACHE_HOST,
  cacheMax: process.env.APP_CACHE_MAX,
  cachePort: process.env.APP_CACHE_PORT,
  cacheStore: process.env.APP_CACHE_STORE,
  cacheTTL: process.env.APP_CACHE_TTL,
  port: process.env.APP_PORT,
  rateLimitMax: process.env.APP_RATE_LIMIIT_MAX,
  rateLimitWindowMs: process.env.APP_RATE_LIMIIT_WINDOW_MS,
  typeOrmDatabase: process.env.APP_TYPEORM_DATABASE,
  typeOrmHost: process.env.APP_TYPEORM_HOST,
  typeOrmLogging: process.env.APP_TYPEORM_LOGGING,
  typeOrmPassword: process.env.APP_TYPEORM_PASSWORD,
  typeOrmPort: process.env.APP_TYPEORM_PORT,
  typeOrmSynchronize: process.env.APP_TYPEORM_SYNCHRONIZE,
  typeOrmUsername: process.env.APP_TYPEORM_APPNAME
}));
