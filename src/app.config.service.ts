import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";

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
