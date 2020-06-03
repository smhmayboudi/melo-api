import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
import { FileConfigService } from "./file.config.service";
import { FileEntity } from "./file.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly fileConfigService: FileConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.fileConfigService.typeormDatabase,
      entities: [FileEntity],
      host: this.fileConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.fileConfigService.typeormLogging),
      logging: this.fileConfigService.typeormLogging,
      name: connectionName,
      password: this.fileConfigService.typeormPassword,
      port: this.fileConfigService.typeormPort,
      synchronize: this.fileConfigService.typeormSynchronize,
      type: "mysql",
      username: this.fileConfigService.typeormUsername,
    };
  }
}
