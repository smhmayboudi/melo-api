import { APP, APP_CACHE_STORE_NONE } from "@melo/common";

import { AppConfigServiceInterface } from "./app.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { LogLevel } from "@sentry/types";
import ms from "ms";

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get apmActive(): boolean {
    return this.configService.get<boolean>(`${APP}.apmActive`, true);
  }

  get apmLogLevel(): string {
    return this.configService.get<string>(`${APP}.apmLogLevel`, "");
  }

  get apmSecretToken(): string {
    return this.configService.get<string>(`${APP}.apmSecretToken`, "");
  }

  get apmServerUrl(): string {
    return this.configService.get<string>(`${APP}.apmServerUrl`, "");
  }

  get apmServiceName(): string {
    return this.configService.get<string>(`${APP}.apmServiceName`, "");
  }

  get cacheHost(): string {
    return this.configService.get<string>(`${APP}.cacheHost`, "");
  }

  get cacheMax(): number {
    return this.configService.get<number>(`${APP}.cacheMax`, 0);
  }

  get cachePort(): number {
    return this.configService.get<number>(`${APP}.cachePort`, 0);
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${APP}.cacheStore`,
      APP_CACHE_STORE_NONE
    );
  }

  get cacheTTL(): number {
    return ms(this.configService.get<string>(`${APP}.cacheTTL`, "0"));
  }

  get dgraphAddress(): string {
    return this.configService.get<string>(`${APP}.dgraphAddress`, "");
  }

  get dgraphDebug(): boolean {
    return this.configService.get<boolean>(`${APP}.dgraphDebug`, true);
  }

  get hashIdAlphabet(): string {
    return this.configService.get<string>(`${APP}.hashIdAlphabet`, "");
  }

  get hashIdMinLength(): number {
    return parseInt(
      this.configService.get<string>(`${APP}.hashIdMinLength`, ""),
      10
    );
  }

  get hashIdSalt(): string {
    return this.configService.get<string>(`${APP}.hashIdSalt`, "");
  }

  get hashIdSeps(): string {
    return this.configService.get<string>(`${APP}.hashIdSeps`, "");
  }

  get mangooseRetryAttempts(): number {
    return this.configService.get<number>(`${APP}.mangooseRetryAttempts`, 0);
  }

  get mangooseRetryDelay(): number {
    return ms(this.configService.get<string>(`${APP}.mangooseRetryDelay`, "0"));
  }

  get mangooseUri(): string {
    return this.configService.get<string>(`${APP}.mangooseUri`, "");
  }

  get port(): number {
    return this.configService.get<number>(`${APP}.port`, 0);
  }

  get promDefaultLabels(): Record<string, string> {
    return JSON.parse(
      this.configService.get<string>(`${APP}.promDefaultLabels`, "")
    );
  }

  get promDefaultMetricsEnabled(): boolean {
    return this.configService.get<boolean>(
      `${APP}.promDefaultMetricsEnabled`,
      true
    );
  }

  get promPath(): string {
    return this.configService.get<string>(`${APP}.promPath`, "");
  }

  get promPrefix(): string {
    return this.configService.get<string>(`${APP}.promPrefix`, "");
  }

  get rateLimitMax(): number {
    return this.configService.get<number>(`${APP}.rateLimitMax`, 0);
  }

  get rateLimitWindowMs(): number {
    return ms(this.configService.get<string>(`${APP}.rateLimitWindowMs`, "0"));
  }

  get sentryDebug(): boolean {
    return this.configService.get<boolean>(`${APP}.sentryDebug`, true);
  }

  get sentryDsn(): string {
    return this.configService.get<string>(`${APP}.sentryDsn`, "");
  }

  get sentryEnviroment(): string {
    return this.configService.get<string>(`${APP}.sentryEnviroment`, "");
  }

  get sentryLogLevel(): LogLevel {
    const logLevel = this.configService.get<number>(`${APP}.sentryLogLevel`, 0);
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
    return this.configService.get<string>(`${APP}.sentryRelease`, "");
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>(`${APP}.typeOrmDatabase`, "");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>(`${APP}.typeOrmHost`, "");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>(`${APP}.typeOrmLogging`, true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>(
      `${APP}.typeOrmPassword`,
      "testpassword"
    );
  }

  get typeOrmPort(): number {
    return this.configService.get<number>(`${APP}.typeOrmPort`, 0);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>(`${APP}.typeOrmSynchronize`, true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>(`${APP}.typeOrmUsername`, "");
  }
}
