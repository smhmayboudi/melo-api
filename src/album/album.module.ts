import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { AppModule } from "../app.module";
import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import config from "./album.config";
import { AlbumConfigService } from "./album.config.service";
import { AlbumController } from "./album.controller";
import { AlbumHealthIndicator } from "./album.health.indicator";
import { AlbumService } from "./album.service";

@Module({
  controllers: [AlbumController],
  exports: [AlbumConfigService, AlbumHealthIndicator, AlbumService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AlbumModule],
      useClass: AlbumCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule
  ],
  providers: [AlbumConfigService, AlbumHealthIndicator, AlbumService]
})
export class AlbumModule {}
