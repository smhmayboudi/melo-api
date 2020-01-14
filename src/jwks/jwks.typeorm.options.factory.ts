import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwksConfigService } from "./jwks.config.service";
import { JwksEntity } from "./jwks.entity";

@Injectable()
export class AuthTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.jwksConfigService.typeOrmDatabase,
      entities: [JwksEntity],
      host: this.jwksConfigService.typeOrmHost,
      logging: this.jwksConfigService.typeOrmLogging,
      password: this.jwksConfigService.typeOrmPassword,
      port: this.jwksConfigService.typeOrmPort,
      synchronize: this.jwksConfigService.typeOrmSynchronize,
      type: "mariadb",
      username: this.jwksConfigService.typeOrmUsername
    };
  }
}
