import * as _ from "lodash";

import { ConfigService } from "@nestjs/config";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { Injectable } from "@nestjs/common";

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
    return _.template(this.configService.get<string>("data.imagePath", ""))({
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
    return this.configService.get<string>("app.typeOrmPassword", "");
  }

  get typeOrmPort(): number {
    return this.configService.get<number>("app.typeOrmPort", 0);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>("app.typeOrmSynchronize", false);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>("app.typeOrmUsername", "");
  }
}
