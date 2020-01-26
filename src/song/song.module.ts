import { CacheModule, forwardRef, Module, HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app.module";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongHealthIndicator } from "./song.health";
import { SongService } from "./song.service";
import { DataModule } from "src/data/data.module";
import { RelationModule } from "src/relation/relation.module";

@Module({
  controllers: [SongController],
  exports: [SongConfigService, SongHealthIndicator, SongService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    RelationModule,
    HttpService
  ],
  providers: [SongConfigService, SongHealthIndicator, SongService]
})
export class SongModule {}
