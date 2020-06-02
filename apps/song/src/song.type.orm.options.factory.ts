import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { Injectable } from "@nestjs/common";
import { SongCacheEntity } from "./song.cache.entity";
import { SongConfigService } from "./song.config.service";
import { SongSiteEntity } from "./song.site.entity";
import { SongTypeOrmLogger } from "./song.type.orm.logger";

@Injectable()
export class SongTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly songConfigService: SongConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.songConfigService.typeormDatabase,
      entities: [SongCacheEntity, SongSiteEntity],
      host: this.songConfigService.typeormHost,
      logger: new SongTypeOrmLogger(this.songConfigService.typeormLogging),
      logging: this.songConfigService.typeormLogging,
      name: connectionName,
      password: this.songConfigService.typeormPassword,
      port: this.songConfigService.typeormPort,
      synchronize: this.songConfigService.typeormSynchronize,
      type: "mysql",
      username: this.songConfigService.typeormUsername,
    };
  }
}
