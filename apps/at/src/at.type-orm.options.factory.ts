import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { AtConfigService } from "./at.config.service";
import { AtEntity } from "./at.entity";
import { CommonTypeOrmLogger } from "@melo/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AtTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly atConfigService: AtConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.atConfigService.typeormDatabase,
      entities: [AtEntity],
      host: this.atConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.atConfigService.typeormLogging),
      logging: this.atConfigService.typeormLogging,
      name: connectionName,
      password: this.atConfigService.typeormPassword,
      port: this.atConfigService.typeormPort,
      synchronize: this.atConfigService.typeormSynchronize,
      type: "mysql",
      username: this.atConfigService.typeormUsername,
    };
  }
}
