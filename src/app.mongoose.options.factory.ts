import { Injectable } from "@nestjs/common";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory
} from "@nestjs/mongoose";
import { AppConfigService } from "./app.config.service";

@Injectable()
export class AppMongooseOptionsFactory implements MongooseOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      retryAttempts: this.appConfigService.mangooseRetryAttempts,
      retryDelay: this.appConfigService.mangooseRetryDelay,
      connectionName: this.appConfigService.mangooseConnectionName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      uri: this.appConfigService.mangooseUri
    };
  }
}
