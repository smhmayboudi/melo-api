import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("app.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("app.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("app.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("app.cacheTTL", 10);
  }

  get port(): number {
    return this.configService.get<number>("app.port", 3000);
  }

  get rateLimitMax(): number {
    return this.configService.get<number>("app.rateLimitMax", 100);
  }

  get rateLimitwindowMs(): number {
    return this.configService.get<number>("app.rateLimitWindowMs", 900000);
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>("app.typeOrmDatabase", "meloapp");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>("app.typeOrmHost", "127.0.0.1");
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
    return this.configService.get<number>("app.typeOrmPort", 3306);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("app.typeOrmSynchronize", true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("app.typeOrmUsername", "root");
  }
}
