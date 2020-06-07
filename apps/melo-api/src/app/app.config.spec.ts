import config from "./app.config";

describe("AppConfig", () => {
  it("should be equal to an object", () => {
    expect(config()).toStrictEqual({
      APM_ACTIVE: undefined,
      APM_LOG_LEVEL: undefined,
      APM_SECRET_TOKEN: undefined,
      APM_SERVER_URL: undefined,
      APM_SERVICE_NAME: undefined,
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
      HASH_ID_ALPHABET: undefined,
      HASH_ID_MIN_LENGTH: undefined,
      HASH_ID_SALT: undefined,
      HASH_ID_SEPS: undefined,
      PORT: undefined,
      PROM_DEFAULT_LABELS: undefined,
      PROM_DEFAULT_METRICS_ENABLED: undefined,
      PROM_PATH: undefined,
      PROM_PREFIX: undefined,
      RATE_LIMIIT_MAX: undefined,
      RATE_LIMIIT_WINDOW_MS: undefined,
      SENTRY_DEBUG: undefined,
      SENTRY_DSN: undefined,
      SENTRY_ENVIROMENT: undefined,
      SENTRY_LOG_LEVEL: undefined,
      SENTRY_RELEASE: undefined,
    });
  });
});
