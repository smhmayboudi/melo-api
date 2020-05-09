import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { AppConfigService } from "./app.config.service";
import { AppTypeOrmLogger } from "./app.type.orm.logger";
import { DataCacheEntity } from "../data/data.cache.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppDataTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.dataTypeOrmDatabase,
      entities: [DataCacheEntity],
      host: this.appConfigService.dataTypeOrmHost,
      logger: new AppTypeOrmLogger(this.appConfigService.dataTypeOrmLogging),
      logging: this.appConfigService.dataTypeOrmLogging,
      name: connectionName,
      password: this.appConfigService.dataTypeOrmPassword,
      port: this.appConfigService.dataTypeOrmPort,
      synchronize: this.appConfigService.dataTypeOrmSynchronize,
      type: "mysql",
      username: this.appConfigService.dataTypeOrmUsername,
    };
  }
}
