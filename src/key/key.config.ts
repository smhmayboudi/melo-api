import { registerAs } from "@nestjs/config";

export default registerAs("key", () => ({
  cacheHost: process.env.KEY_CACHE_HOST,
  cacheMax: process.env.KEY_CACHE_MAX,
  cachePort: process.env.KEY_CACHE_PORT,
  cacheTTL: process.env.KEY_CACHE_TTL,
  typeOrmDatabase: process.env.KEY_TYPE_ORM_DATABASE,
  typeOrmHost: process.env.KEY_TYPE_ORM_HOST,
  typeOrmLogging: process.env.KEY_TYPE_ORM_LOGGING,
  typeOrmPassword: process.env.KEY_TYPE_ORM_PASSWORD,
  typeOrmPort: process.env.KEY_TYPE_ORM_PORT,
  typeOrmSynchronize: process.env.KEY_TYPE_ORM_SYNCHRONIZE,
  typeOrmUsername: process.env.KEY_TYPE_ORM_USERNAME
}));
