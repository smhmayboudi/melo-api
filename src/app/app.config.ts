import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  apmLogLevel: process.env.APP_APM_LOG_LEVEL,
  apmSecretToken: process.env.APP_APM_SECRET_TOKEN,
  apmServerUrl: process.env.APP_APM_SERVER_URL,
  apmServiceName: process.env.APP_APM_SERVICE_NAME,
  cacheEnable: process.env.APP_CACHE_ENABLE,
  cacheHost: process.env.APP_CACHE_HOST,
  cacheMax: process.env.APP_CACHE_MAX,
  cachePort: process.env.APP_CACHE_PORT,
  cacheStore: process.env.APP_CACHE_STORE,
  cacheTTL: process.env.APP_CACHE_TTL,
  hashIdAlphabet: process.env.APP_HASH_ID_ALPHABET,
  hashIdMinLength: process.env.APP_HASH_ID_MIN_LENGTH,
  hashIdSalt: process.env.APP_HASH_ID_SALT,
  hashIdSeps: process.env.APP_HASH_ID_SEPS,
  imgProxyBaseUrl: process.env.APP_IMG_PROXY_BASE_URL,
  imgProxyEncode: process.env.APP_IMG_PROXY_ENCODE,
  imgProxyKey: process.env.APP_IMG_PROXY_KEY,
  imgProxySalt: process.env.APP_IMG_PROXY_SALT,
  imgProxySignatureSize: process.env.APP_IMG_PROXY_SIGNATURE_SIZE,
  imgProxyImageTypeSize: process.env.APP_IMG_PROXY_TYPE_SIZE,
  mangooseRetryAttempts: process.env.APP_MANGOOSE_RETRY_ATTEMPTS,
  mangooseRetryDelay: process.env.APP_MANGOOSE_RETRY_DELAY,
  mangooseUri: process.env.APP_MANGOOSE_URI,
  port: process.env.APP_PORT,
  promClientPrefix: process.env.APP_PROM_CLIENT_PREFIX,
  rateLimitMax: process.env.APP_RATE_LIMIIT_MAX,
  rateLimitWindowMs: process.env.APP_RATE_LIMIIT_WINDOW_MS,
  sentryDebug: process.env.APP_SENTRY_DEBUG,
  sentryDsn: process.env.APP_SENTRY_DSN,
  sentryEnviroment: process.env.APP_SENTRY_ENVIROMENT,
  sentryLogLevel: process.env.APP_SENTRY_LOG_LEVEL,
  sentryRelease: process.env.APP_SENTRY_RELEASE,
  typeOrmDatabase: process.env.APP_TYPEORM_DATABASE,
  typeOrmHost: process.env.APP_TYPEORM_HOST,
  typeOrmLogging: process.env.APP_TYPEORM_LOGGING,
  typeOrmPassword: process.env.APP_TYPEORM_PASSWORD,
  typeOrmPort: process.env.APP_TYPEORM_PORT,
  typeOrmSynchronize: process.env.APP_TYPEORM_SYNCHRONIZE,
  typeOrmUsername: process.env.APP_TYPEORM_APPNAME
}));