import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
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
      database: this.dataConfigService.typeormDatabase,
      entities: [DataCacheEntity, DataSiteEntity],
      host: this.dataConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.dataConfigService.typeormLogging),
      logging: this.dataConfigService.typeormLogging,
      name: connectionName,
      password: this.dataConfigService.typeormPassword,
      port: this.dataConfigService.typeormPort,
      synchronize: this.dataConfigService.typeormSynchronize,
      type: "mysql",
      username: this.dataConfigService.typeormUsername,
    };
  }
}
