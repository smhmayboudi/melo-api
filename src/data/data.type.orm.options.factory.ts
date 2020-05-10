import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { AppTypeOrmLogger } from "../app/app.type.orm.logger";
import { DataCacheEntity } from "./data.cache.entity";
import { DataConfigService } from "./data.config.service";
import { DataSiteEntity } from "./data.site.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DataTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly dataConfigService: DataConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.dataConfigService.typeOrmDatabase,
      entities: [DataCacheEntity, DataSiteEntity],
      host: this.dataConfigService.typeOrmHost,
      logger: new AppTypeOrmLogger(this.dataConfigService.typeOrmLogging),
      logging: this.dataConfigService.typeOrmLogging,
      name: connectionName,
      password: this.dataConfigService.typeOrmPassword,
      port: this.dataConfigService.typeOrmPort,
      synchronize: this.dataConfigService.typeOrmSynchronize,
      type: "mysql",
      username: this.dataConfigService.typeOrmUsername,
    };
  }
}
