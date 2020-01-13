import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("user.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("user.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("user.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("user.cacheTTL", 10);
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>("user.cacheHost", "meloapp");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>("user.typeOrmHost", "127.0.0.1");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>("user.typeOrmLogging", true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>("user.password", "testpassword");
  }

  get typeOrmPort(): number {
    return this.configService.get<number>("user.typeOrmPort", 3306);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("user.typeOrmSynchronize", true);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("user.username", "root");
  }
}
