import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { AppConfigService } from "./app.config.service";
import { AppTypeOrmLogger } from "./app.type.orm.logger";
import { AtEntity } from "../at/at.entity";
import { FileEntity } from "../file/file.entity";
import { Injectable } from "@nestjs/common";
import { JwksEntity } from "../jwks/jwks.entity";
import { RtEntity } from "../rt/rt.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class AppTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.typeormDatabase,
      entities: [FileEntity, JwksEntity, AtEntity, RtEntity, UserEntity],
      host: this.appConfigService.typeormHost,
      logger: new AppTypeOrmLogger(this.appConfigService.typeormLogging),
      logging: this.appConfigService.typeormLogging,
      name: connectionName,
      password: this.appConfigService.typeormPassword,
      port: this.appConfigService.typeormPort,
      synchronize: this.appConfigService.typeormSynchronize,
      type: "mysql",
      username: this.appConfigService.typeormUsername,
    };
  }
}
