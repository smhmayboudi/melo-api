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
      retryAttempts: this.playlistConfigService.mongooseRetryAttempts,
      retryDelay: this.playlistConfigService.mongooseRetryDelay,
      uri: this.playlistConfigService.mongooseUri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
