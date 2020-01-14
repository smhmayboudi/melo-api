import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KeyConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("key.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("key.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("key.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("key.cacheTTL", 10);
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>("key.cacheHost", "meloapp");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>("key.typeOrmHost", "127.0.0.1");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>("key.typeOrmLogging", true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>("key.password", "testpassword");
  }

  get typeOrmPort(): number {
    return this.configService.get<number>("key.typeOrmPort", 3306);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("key.typeOrmSynchronize", true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("key.typeOrmUsername", "root");
  }
}
