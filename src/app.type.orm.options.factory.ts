import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AppConfigService } from "./app.config.service";
import { AtEntity } from "./at/at.entity";
import { JwksEntity } from "./jwks/jwks.entity";
import { TokenEntity } from "./token/token.entity";
import { UserEntity } from "./user/user.entity";

@Injectable()
export class AppTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.typeOrmDatabase,
      entities: [JwksEntity, AtEntity, TokenEntity, UserEntity],
      host: this.appConfigService.typeOrmHost,
      logging: this.appConfigService.typeOrmLogging,
      password: this.appConfigService.typeOrmPassword,
      port: this.appConfigService.typeOrmPort,
      synchronize: this.appConfigService.typeOrmSynchronize,
      type: "mariadb",
      username: this.appConfigService.typeOrmUsername
    };
  }
}
