import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AlbumConfigService {
  constructor(private readonly configService: ConfigService) {}

  get cacheHost(): string {
    return this.configService.get<string>("album.cacheHost", "127.0.0.1");
  }

  get cacheMax(): number {
    return this.configService.get<number>("album.cacheMax", 10);
  }

  get cachePort(): number {
    return this.configService.get<number>("album.cachePort", 6379);
  }

  get cacheTTL(): number {
    return this.configService.get<number>("album.cacheTTL", 10);
  }
}
