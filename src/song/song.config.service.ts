import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SongConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("song.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("song.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("song.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("song.cacheTTL", 10);
  }
}
