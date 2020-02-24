import { CacheModule, forwardRef, HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import { PromModule } from "../prom/prom.module";
import { RelationModule } from "../relation/relation.module";
import { UserModule } from "../user/user.module";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongHealthIndicator } from "./song.health.indicator";
import { SongHttpModuleOptionsFactory } from "./song.http.options.factory";
import { SongService } from "./song.service";

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
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongHttpModuleOptionsFactory
    }),
    PromModule.forCounter({
      help: "counter",
      labelNames: ["function", "module", "service"],
      name: "song"
    }),
    RelationModule,
    UserModule
  ],
  providers: [SongConfigService, SongHealthIndicator, SongService]
})
export class SongModule {}
