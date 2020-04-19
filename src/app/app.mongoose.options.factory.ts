import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";

import { AppConfigService } from "./app.config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppMongooseOptionsFactory implements MongooseOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      retryAttempts: this.appConfigService.mangooseRetryAttempts,
      retryDelay: this.appConfigService.mangooseRetryDelay,
      uri: this.appConfigService.mangooseUri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
