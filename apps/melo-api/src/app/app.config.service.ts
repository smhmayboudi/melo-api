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
  DGRAPH_ADDRESS,
  DGRAPH_DEBUG,
  HASH_ID_ALPHABET,
  HASH_ID_MIN_LENGTH,
  HASH_ID_SALT,
  HASH_ID_SEPS,
  MANGOOSE_RETRY_ATTEMPTS,
  MANGOOSE_RETRY_DELAY,
  MANGOOSE_URI,
  PORT,
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
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_LOGGING,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_USERNAME,
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

  get dgraphAddress(): string {
    return this.configService.get<string>(`${APP}.${DGRAPH_ADDRESS}`, "");
  }

  get dgraphDebug(): boolean {
    return this.configService.get<boolean>(`${APP}.${DGRAPH_DEBUG}`, true);
  }

  get hashIdAlphabet(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_ALPHABET}`, "");
  }

  get hashIdMinLength(): number {
    return this.configService.get<number>(`${APP}.${HASH_ID_MIN_LENGTH}`, 0);
  }

  get hashIdSalt(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_SALT}`, "");
  }

  get hashIdSeps(): string {
    return this.configService.get<string>(`${APP}.${HASH_ID_SEPS}`, "");
  }

  get mangooseRetryAttempts(): number {
    return this.configService.get<number>(
      `${APP}.${MANGOOSE_RETRY_ATTEMPTS}`,
      0
    );
  }

  get mangooseRetryDelay(): number {
    return ms(
      this.configService.get<string>(`${APP}.${MANGOOSE_RETRY_DELAY}`, "0")
    );
  }

  get mangooseUri(): string {
    return this.configService.get<string>(`${APP}.${MANGOOSE_URI}`, "");
  }

  get port(): number {
    return this.configService.get<number>(`${APP}.${PORT}`, 0);
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

  get typeormDatabase(): string {
    return this.configService.get<string>(`${APP}.${TYPEORM_DATABASE}`, "");
  }

  get typeormHost(): string {
    return this.configService.get<string>(`${APP}.${TYPEORM_HOST}`, "");
  }

  get typeormLogging(): boolean {
    return this.configService.get<boolean>(`${APP}.${TYPEORM_LOGGING}`, true);
  }

  get typeormPassword(): string {
    return this.configService.get<string>(`${APP}.${TYPEORM_PASSWORD}`, "");
  }

  get typeormPort(): number {
    return this.configService.get<number>(`${APP}.${TYPEORM_PORT}`, 0);
  }

  get typeormSynchronize(): boolean {
    return this.configService.get<boolean>(
      `${APP}.${TYPEORM_SYNCHRONIZE}`,
      true
    );
  }

  get typeormUsername(): string {
    return this.configService.get<string>(`${APP}.${TYPEORM_USERNAME}`, "");
  }
}
