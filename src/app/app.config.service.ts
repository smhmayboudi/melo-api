import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LogLevel } from "@sentry/types";
import { SignatureSize } from "imgproxy/dist/types";
import ms from "ms";
import { ImgProxyImageTypeSize } from "./app.module.interface";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apmLogLevel(): string {
    return this.configService.get<string>("app.apmLogLevel", "");
  }

  get apmSecretToken(): string {
    return this.configService.get<string>("app.apmSecretToken", "");
  }

  get apmServerUrl(): string {
    return this.configService.get<string>("app.apmServerUrl", "");
  }

  get apmServiceName(): string {
    return this.configService.get<string>("app.apmServiceName", "");
  }

  get cacheHost(): string {
    return this.configService.get<string>("app.cacheHost", "");
  }

  get cacheMax(): number {
    return this.configService.get<number>("app.cacheMax", 0);
  }

  get cachePort(): number {
    return this.configService.get<number>("app.cachePort", 0);
  }

  get cacheStore(): string {
    return this.configService.get<string>("app.cacheStore", "none");
  }

  get cacheTTL(): number {
    return ms(this.configService.get<string>("app.cacheTTL", "0"));
  }

  get hashIdAlphabet(): string {
    return this.configService.get<string>("app.hashIdAlphabet", "");
  }

  get hashIdMinLength(): number {
    return parseInt(
      this.configService.get<string>("app.hashIdMinLength", ""),
      10
    );
  }

  get hashIdSalt(): string {
    return this.configService.get<string>("app.hashIdSalt", "");
  }

  get hashIdSeps(): string {
    return this.configService.get<string>("app.hashIdSeps", "");
  }

  get imgProxyBaseUrl(): string {
    return this.configService.get<string>("app.imgProxyUrl", "");
  }

  get imgProxyEncode(): boolean {
    return this.configService.get<boolean>("app.imgProxyEncode", true);
  }

  get imgProxyKey(): string {
    return this.configService.get<string>("app.imgProxyKey", "");
  }

  get imgProxySalt(): string {
    return this.configService.get<string>("app.imgProxySalt", "");
  }

  get imgProxySignatureSize(): SignatureSize {
    return this.configService.get<SignatureSize>(
      "app.imgProxySignatureSize",
      1
    );
  }

  get imgProxyImageTypeSize(): ImgProxyImageTypeSize[] {
    return JSON.parse(
      this.configService.get<string>("app.imgProxyImageTypeSize", "")
    ) as ImgProxyImageTypeSize[];
  }

  get mangooseRetryAttempts(): number {
    return this.configService.get<number>("app.mangooseRetryAttempts", 0);
  }

  get mangooseRetryDelay(): number {
    return ms(this.configService.get<string>("app.mangooseRetryDelay", "0"));
  }

  get mangooseUri(): string {
    return this.configService.get<string>("app.mangooseUri", "");
  }

  get port(): number {
    return this.configService.get<number>("app.port", 0);
  }

  get promDefaultLabels(): Record<string, string> {
    return JSON.parse(
      this.configService.get<string>("app.promDefaultLabels", "")
    );
  }

  get promDefaultMetricsEnabled(): boolean {
    return this.configService.get<boolean>(
      "app.promDefaultMetricsEnabled",
      true
    );
  }

  get promPath(): string {
    return this.configService.get<string>("app.promPath", "");
  }

  get promPrefix(): string {
    return this.configService.get<string>("app.promPrefix", "");
  }

  get rateLimitMax(): number {
    return this.configService.get<number>("app.rateLimitMax", 0);
  }

  get rateLimitWindowMs(): number {
    return ms(this.configService.get<string>("app.rateLimitWindowMs", "0"));
  }

  get sentryDebug(): boolean {
    return this.configService.get<boolean>("app.sentryDebug", true);
  }

  get sentryDsn(): string {
    return this.configService.get<string>("app.sentryDsn", "");
  }

  get sentryEnviroment(): string {
    return this.configService.get<string>("app.sentryEnviroment", "");
  }

  get sentryLogLevel(): LogLevel {
    const logLevel = this.configService.get<number>("app.sentryLogLevel", 0);
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
    return this.configService.get<string>("app.sentryRelease", "");
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>("app.typeOrmDatabase", "");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>("app.typeOrmHost", "");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>("app.typeOrmLogging", true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>(
      "app.typeOrmPassword",
      "testpassword"
    );
  }

  get typeOrmPort(): number {
    return this.configService.get<number>("app.typeOrmPort", 0);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("app.typeOrmSynchronize", true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("app.typeOrmUsername", "");
  }
}
