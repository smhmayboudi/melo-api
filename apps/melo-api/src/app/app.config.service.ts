import {
  APM_ACTIVE,
  APM_LOG_LEVEL,
  APM_SECRET_TOKEN,
  APM_SERVER_URL,
  APM_SERVICE_NAME,
  APP,
  APP_CACHE_STORE_NONE,
  CACHE_HOST,
  CACHE_MAX,
  CACHE_PORT,
  CACHE_STORE,
  CACHE_TTL,
  HASH_ID_ALPHABET,
  HASH_ID_MIN_LENGTH,
  HASH_ID_SALT,
  HASH_ID_SEPS,
  PROM_DEFAULT_LABELS,
  PROM_DEFAULT_METRICS_ENABLED,
  PROM_PATH,
  PROM_PREFIX,
  RATE_LIMIIT_MAX,
  RATE_LIMIIT_WINDOW_MS,
  SENTRY_DEBUG,
  SENTRY_DSN,
  SENTRY_ENVIROMENT,
  SENTRY_LOG_LEVEL,
  SENTRY_RELEASE,
  SERVICE_PORT,
} from "@melo/common";

import { AppConfigServiceInterface } from "./app.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { LogLevel } from "@sentry/types";
import ms from "ms";

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get apmActive(): boolean {
    return this.configService.get<boolean>(`${APP}.${APM_ACTIVE}`, true);
  }

  get apmLogLevel(): string {
    return this.configService.get<string>(`${APP}.${APM_LOG_LEVEL}`, "");
  }

  get apmSecretToken(): string {
    return this.configService.get<string>(`${APP}.${APM_SECRET_TOKEN}`, "");
  }

  get apmServerUrl(): string {
    return this.configService.get<string>(`${APP}.${APM_SERVER_URL}`, "");
  }

  get apmServiceName(): string {
    return this.configService.get<string>(`${APP}.${APM_SERVICE_NAME}`, "");
  }

  get cacheHost(): string {
    return this.configService.get<string>(`${APP}.${CACHE_HOST}`, "");
  }

  get cacheMax(): number {
    return this.configService.get<number>(`${APP}.${CACHE_MAX}`, 0);
  }

  get cachePort(): number {
    return this.configService.get<number>(`${APP}.${CACHE_PORT}`, 0);
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${APP}.${CACHE_STORE}`,
      APP_CACHE_STORE_NONE
    );
  }

  get cacheTTL(): number {
    return ms(this.configService.get<string>(`${APP}.${CACHE_TTL}`, "0"));
  }

  get hashIdAlphabet(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_ALPHABET}`, "");
  }

  get hashIdMinLength(): number {
    return parseInt(
      this.configService.get<string>(`${APP}.${HASH_ID_MIN_LENGTH}`, "0"),
      10
    );
  }

  get hashIdSalt(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_SALT}`, "");
  }

  get hashIdSeps(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_SEPS}`, "");
  }

  get port(): number {
    return this.configService.get<number>(`${APP}.${SERVICE_PORT}`, 0);
  }

  get promDefaultLabels(): Record<string, string> {
    return JSON.parse(
      this.configService.get<string>(`${APP}.${PROM_DEFAULT_LABELS}`, '{"":""}')
    );
  }

  get promDefaultMetricsEnabled(): boolean {
    return this.configService.get<boolean>(
      `${APP}.${PROM_DEFAULT_METRICS_ENABLED}`,
      true
    );
  }

  get promPath(): string {
    return this.configService.get<string>(`${APP}.${PROM_PATH}`, "");
  }

  get promPrefix(): string {
    return this.configService.get<string>(`${APP}.${PROM_PREFIX}`, "");
  }

  get rateLimitMax(): number {
    return this.configService.get<number>(`${APP}.${RATE_LIMIIT_MAX}`, 0);
  }

  get rateLimitWindowMs(): number {
    return ms(
      this.configService.get<string>(`${APP}.${RATE_LIMIIT_WINDOW_MS}`, "0")
    );
  }

  get sentryDebug(): boolean {
    return this.configService.get<boolean>(`${APP}.${SENTRY_DEBUG}`, true);
  }

  get sentryDsn(): string {
    return this.configService.get<string>(`${APP}.${SENTRY_DSN}`, "");
  }

  get sentryEnviroment(): string {
    return this.configService.get<string>(`${APP}.${SENTRY_ENVIROMENT}`, "");
  }

  get sentryLogLevel(): LogLevel {
    const logLevel = this.configService.get<number>(
      `${APP}.${SENTRY_LOG_LEVEL}`,
      1
    );
    switch (logLevel) {
      case 1:
        return LogLevel.Error;
      case 2:
        return LogLevel.Debug;
      case 3:
        return LogLevel.Verbose;
      default:
        return LogLevel.None;
    }
  }

  get sentryRelease(): string {
    return this.configService.get<string>(`${APP}.${SENTRY_RELEASE}`, "");
  }
}
