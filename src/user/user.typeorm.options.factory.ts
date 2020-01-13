import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { UserConfigService } from "./user.config.service";
import { UserEntity } from "./user.entity";

@Injectable()
export class AuthTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.userConfigService.typeOrmDatabase,
      entities: [UserEntity],
      host: this.userConfigService.typeOrmHost,
      logging: this.userConfigService.typeOrmLogging,
      password: this.userConfigService.typeOrmPassword,
      port: this.userConfigService.typeOrmPort,
      synchronize: this.userConfigService.typeOrmSynchronize,
      type: "mariadb",
      username: this.userConfigService.typeOrmUsername
    };
  }
}
