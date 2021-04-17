import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { CommonTypeOrmLogger } from "@melo/common";
import { Injectable } from "@nestjs/common";
import { TagConfigService } from "./tag.config.service";
import { TagEntity } from "./tag.entity";
import { TagRelationEntity } from "./tag-relation.entity";

@Injectable()
export class TagTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly tagConfigService: TagConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.tagConfigService.typeormDatabase,
      entities: [TagEntity, TagRelationEntity],
      host: this.tagConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(this.tagConfigService.typeormLogging),
      logging: this.tagConfigService.typeormLogging,
      name: connectionName,
      password: this.tagConfigService.typeormPassword,
      port: this.tagConfigService.typeormPort,
      synchronize: this.tagConfigService.typeormSynchronize,
      type: "mysql",
      username: this.tagConfigService.typeormUsername,
    };
  }
}
