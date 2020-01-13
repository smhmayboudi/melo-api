import { registerAs } from "@nestjs/config";

export default registerAs("user", () => ({
  cacheHost: process.env.USER_CACHE_HOST,
  cacheMax: process.env.USER_CACHE_MAX,
  cachePort: process.env.USER_CACHE_PORT,
  cacheTTL: process.env.USER_CACHE_TTL,
  typeOrmDatabase: process.env.USER_TYPEORM_DATABASE,
  typeOrmHost: process.env.USER_TYPEORM_HOST,
  typeOrmLogging: process.env.USER_TYPEORM_LOGGING,
  typeOrmPassword: process.env.USER_TYPEORM_PASSWORD,
  typeOrmPort: process.env.USER_TYPEORM_PORT,
  typeOrmSynchronize: process.env.USER_TYPEORM_SYNCHRONIZE,
  typeOrmUsername: process.env.USER_TYPEORM_USERNAME
}));
