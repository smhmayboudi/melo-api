import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";

import { Injectable } from "@nestjs/common";
import { PlaylistConfigService } from "./playlist.config.service";

@Injectable()
export class PlaylistMongooseOptionsFactory implements MongooseOptionsFactory {
  constructor(private readonly playlistConfigService: PlaylistConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      retryAttempts: this.playlistConfigService.mangooseRetryAttempts,
      retryDelay: this.playlistConfigService.mangooseRetryDelay,
      uri: this.playlistConfigService.mangooseUri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
