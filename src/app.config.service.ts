import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import ms from "ms";
import querystring from "querystring";

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
    return this.configService.get<number>("app.hashIdMinLength", 0);
  }

  get hashIdSalt(): string {
    return this.configService.get<string>("app.hashIdSalt", "");
  }

  get hashIdSeps(): string {
    return this.configService.get<string>("app.hashIdSeps", "");
  }

  get imageTypeSize(): { name: string; width: number; height: number }[] {
    return this.configService
      .get<string>("app.imageTypeSize", "")
      .split(",")
      .filter((p: string) => p && p !== "")
      .map((p: string) => {
        const [name, sizesString] = p.split(":");
        const [w, h] = sizesString.split("x");

        return {
          name: name,
          width: parseInt(w),
          height: parseInt(h)
        };
      });
  }

  get imgProxyUrl(): string {
    return this.configService.get<string>("app.imgProxyUrl", "");
  }

  get imgProxyKey(): string {
    return this.configService.get<string>("app.imgProxyKey", "");
  }

  get imgProxySalt(): string {
    return this.configService.get<string>("app.imgProxySalt", "");
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

  get staticImageUrl(): { [key: string]: string } {
    return querystring.parse(
      this.configService.get<string>("app.typeOrmDatabase", "")
    ) as { [key: string]: string };
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
