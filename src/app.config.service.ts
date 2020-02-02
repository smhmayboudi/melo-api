import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignatureSize } from "imgproxy/dist/types";
import ms from "ms";
import { ImgProxyImageTypeSize } from "./type/ImgProxyImageTypeSize";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

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
    return (JSON.parse(
      this.configService.get<string>("app.imgProxyImageTypeSize", "")
    ) as unknown) as ImgProxyImageTypeSize[];
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

  get rateLimitMax(): number {
    return this.configService.get<number>("app.rateLimitMax", 0);
  }

  get rateLimitWindowMs(): number {
    return ms(this.configService.get<string>("app.rateLimitWindowMs", "0"));
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
