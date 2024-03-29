import { APP } from "@melo/common";
import { registerAs } from "@nestjs/config";

export default registerAs(APP, () => ({
  APM_ACTIVE: process.env.APP_APM_ACTIVE,
  APM_LOG_LEVEL: process.env.APP_APM_LOG_LEVEL,
  APM_SECRET_TOKEN: process.env.APP_APM_SECRET_TOKEN,
  APM_SERVER_URL: process.env.APP_APM_SERVER_URL,
  APM_SERVICE_NAME: process.env.APP_APM_SERVICE_NAME,
  CACHE_HOST: process.env.APP_CACHE_HOST,
  CACHE_MAX: process.env.APP_CACHE_MAX,
  CACHE_PORT: process.env.APP_CACHE_PORT,
  CACHE_STORE: process.env.APP_CACHE_STORE,
  CACHE_TTL: process.env.APP_CACHE_TTL,
  HASH_ID_ALPHABET: process.env.APP_HASH_ID_ALPHABET,
  HASH_ID_MIN_LENGTH: process.env.APP_HASH_ID_MIN_LENGTH,
  HASH_ID_SALT: process.env.APP_HASH_ID_SALT,
  HASH_ID_SEPS: process.env.APP_HASH_ID_SEPS,
  PROM_DEFAULT_LABELS: process.env.APP_PROM_DEFAULT_LABELS,
  PROM_DEFAULT_METRICS_ENABLED: process.env.APP_PROM_DEFAULT_METRICS_ENABLED,
  PROM_PATH: process.env.APP_PROM_PATH,
  PROM_PREFIX: process.env.APP_PROM_PREFIX,
  RATE_LIMIIT_MAX: process.env.APP_RATE_LIMIIT_MAX,
  RATE_LIMIIT_WINDOW_MS: process.env.APP_RATE_LIMIIT_WINDOW_MS,
  SENTRY_DEBUG: process.env.APP_SENTRY_DEBUG,
  SENTRY_DSN: process.env.APP_SENTRY_DSN,
  SENTRY_ENVIROMENT: process.env.APP_SENTRY_ENVIROMENT,
  SENTRY_LOG_LEVEL: process.env.APP_SENTRY_LOG_LEVEL,
  SENTRY_RELEASE: process.env.APP_SENTRY_RELEASE,
  SERVICE_PORT: process.env.APP_SERVICE_PORT,
}));
