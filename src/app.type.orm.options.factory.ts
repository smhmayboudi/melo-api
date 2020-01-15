import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { AppConfigService } from "./app.config.service";
import { JwksEntity } from "./jwks/jwks.entity";
import { UserEntity } from "./user/user.entity";

@Injectable()
export class AppTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.appConfigService.typeOrmDatabase,
      entities: [JwksEntity, UserEntity],
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
