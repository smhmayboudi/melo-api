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
    return ms(this.configService.get<string>("app.cacheTTL", "")) / 1000;
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

  // TODO: check it
  // TODO: return type
  // TODO: qurtyString
  get imgProxyImageTypeSize(): ImgProxyImageTypeSize[] {
    return this.configService
      .get<string>("app.imgProxyImageTypeSize", "")
      .split(",")
      .filter((p: string) => p && p !== "")
      .map((p: string) => {
        const [name, sizesString] = p.split(":");
        const [w, h] = sizesString.split("x");
        return {
          name,
          width: parseInt(w, 10),
          height: parseInt(h, 10)
        };
      });
  }

  get mangooseRetryAttempts(): number {
    return this.configService.get<number>("app.mangooseRetryAttempts", 0);
  }

  get mangooseRetryDelay(): number {
    return ms(this.configService.get<string>("app.mangooseRetryDelay", "0"));
  }

  get mangooseConnectionName(): string {
    return this.configService.get<string>("app.mangooseConnectionName", "");
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
    return ms(this.configService.get<string>("app.rateLimitWindowMs", ""));
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
