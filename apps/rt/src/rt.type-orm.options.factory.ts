import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
import { Injectable } from "@nestjs/common";
import { RtConfigService } from "./rt.config.service";
import { RtEntity } from "./rt.entity";

@Injectable()
export class RtTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly rtConfigService: RtConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.rtConfigService.typeormDatabase,
      entities: [RtEntity],
      host: this.rtConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.rtConfigService.typeormLogging),
      logging: this.rtConfigService.typeormLogging,
      name: connectionName,
      password: this.rtConfigService.typeormPassword,
      port: this.rtConfigService.typeormPort,
      synchronize: this.rtConfigService.typeormSynchronize,
      type: "mysql",
      username: this.rtConfigService.typeormUsername,
    };
  }
}
