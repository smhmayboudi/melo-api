import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
import { Injectable } from "@nestjs/common";
import { JwksConfigService } from "./jwks.config.service";
import { JwksEntity } from "./jwks.entity";

@Injectable()
export class JwksTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly jwksConfigService: JwksConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.jwksConfigService.typeormDatabase,
      entities: [JwksEntity],
      host: this.jwksConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.jwksConfigService.typeormLogging),
      logging: this.jwksConfigService.typeormLogging,
      name: connectionName,
      password: this.jwksConfigService.typeormPassword,
      port: this.jwksConfigService.typeormPort,
      synchronize: this.jwksConfigService.typeormSynchronize,
      type: "mysql",
      username: this.jwksConfigService.typeormUsername,
    };
  }
}
