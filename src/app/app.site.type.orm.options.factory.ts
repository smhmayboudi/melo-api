import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { AppConfigService } from "./app.config.service";
import { AppTypeOrmLogger } from "./app.type.orm.logger";
import { DataSiteEntity } from "../data/data.site.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppSiteTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.siteTypeOrmDatabase,
      entities: [DataSiteEntity],
      host: this.appConfigService.siteTypeOrmHost,
      logger: new AppTypeOrmLogger(this.appConfigService.siteTypeOrmLogging),
      logging: this.appConfigService.siteTypeOrmLogging,
      name: connectionName,
      password: this.appConfigService.siteTypeOrmPassword,
      port: this.appConfigService.siteTypeOrmPort,
      synchronize: this.appConfigService.siteTypeOrmSynchronize,
      type: "mysql",
      username: this.appConfigService.siteTypeOrmUsername,
    };
  }
}
