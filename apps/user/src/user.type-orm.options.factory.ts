import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
import { Injectable } from "@nestjs/common";
import { UserConfigService } from "./user.config.service";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.userConfigService.typeormDatabase,
      entities: [UserEntity],
      host: this.userConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.userConfigService.typeormLogging),
      logging: this.userConfigService.typeormLogging,
      name: connectionName,
      password: this.userConfigService.typeormPassword,
      port: this.userConfigService.typeormPort,
      synchronize: this.userConfigService.typeormSynchronize,
      type: "mysql",
      username: this.userConfigService.typeormUsername,
    };
  }
}
