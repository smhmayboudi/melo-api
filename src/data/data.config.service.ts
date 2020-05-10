import { ConfigService } from "@nestjs/config";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { Injectable } from "@nestjs/common";
import { template } from "lodash";

@Injectable()
export class DataConfigService implements DataConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get defaultAlbumImagePath(): string {
    return this.configService.get<string>("data.defaultAlbumImagePath", "");
  }

  get defaultArtistImagePath(): string {
    return this.configService.get<string>("data.defaultArtistImagePath", "");
  }

  get defaultSongImagePath(): string {
    return this.configService.get<string>("data.defaultSongImagePath", "");
  }

  get elasticNode(): string {
    return this.configService.get<string>("data.elasticNode", "");
  }

  imagePath(id: string): string {
    return template(this.configService.get<string>("data.imagePath", ""))({
      id,
    });
  }

  get index(): string {
    return this.configService.get<string>("data.index", "");
  }

  get mp3Endpoint(): string {
    return this.configService.get<string>("data.mp3Endpoint", "");
  }

  get resultSize(): number {
    return this.configService.get<number>("data.resultSize", 0);
  }
}
