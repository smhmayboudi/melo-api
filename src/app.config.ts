import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  cacheHost: process.env.APP_CACHE_HOST,
  cacheMax: process.env.APP_CACHE_MAX,
  cachePort: process.env.APP_CACHE_PORT,
  cacheTTL: process.env.APP_CACHE_TTL,
  port: process.env.APP_PORT,
  rateLimitMax: process.env.APP_RATE_LIMIIT_MAX,
  rateLimitWindowMs: process.env.APP_RATEL_IMIIT_WINDOWMS,
  typeOrmDatabase: process.env.APP_TYPE_ORM_DATABASE,
  typeOrmHost: process.env.APP_TYPE_ORM_HOST,
  typeOrmLogging: process.env.APP_TYPE_ORM_LOGGING,
  typeOrmPassword: process.env.APP_TYPE_ORM_PASSWORD,
  typeOrmPort: process.env.APP_TYPE_ORM_PORT,
  typeOrmSynchronize: process.env.APP_TYPE_ORM_SYNCHRONIZE,
  typeOrmUsername: process.env.APP_TYPE_ORM_APPNAME
}));
