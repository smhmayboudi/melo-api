import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("rt.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("rt.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("rt.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("rt.cacheTTL", 10);
  }
}
