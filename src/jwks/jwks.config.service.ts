import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwksConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("jwks.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("jwks.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("jwks.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("jwks.cacheTTL", 10);
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>("jwks.cacheHost", "meloapp");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>("jwks.typeOrmHost", "127.0.0.1");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>("jwks.typeOrmLogging", true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>("jwks.password", "testpassword");
  }

  get typeOrmPort(): number {
    return this.configService.get<number>("jwks.typeOrmPort", 3306);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("jwks.typeOrmSynchronize", true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("jwks.typeOrmUsername", "root");
  }
}
