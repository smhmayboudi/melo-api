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

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.typeOrmDatabase,
      entities: [FileEntity, JwksEntity, AtEntity, RtEntity, UserEntity],
      host: this.appConfigService.typeOrmHost,
      logger: new AppTypeOrmLogger(this.appConfigService.typeOrmLogging),
      logging: this.appConfigService.typeOrmLogging,
      password: this.appConfigService.typeOrmPassword,
      port: this.appConfigService.typeOrmPort,
      synchronize: this.appConfigService.typeOrmSynchronize,
      type: "mysql",
      username: this.appConfigService.typeOrmUsername,
    };
  }
}
