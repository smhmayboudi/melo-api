/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, HttpModule, Module, forwardRef } from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
// import { SongHealthIndicator } from "./song.health.indicator";
import { SongHttpOptionsFactory } from "./song.http.options.factory";
import { SongLocalizeInterceptor } from "./song.localize.interceptor";
import { SongService } from "./song.service";
import { UserModule } from "../user/user.module";
import config from "./song.config";

@Module({
  controllers: [SongController],
  exports: [
    SongConfigService,
    // SongHealthIndicator,
    SongService
  ],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [SongModule],
      useClass: SongCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    HttpModule.registerAsync({
      imports: [SongModule],
      useClass: SongHttpOptionsFactory
    }),
    RelationModule,
    UserModule
  ],
  providers: [
    SongConfigService,
    // SongHealthIndicator,
    {
      provide: APP_INTERCEPTOR,
      useClass: SongLocalizeInterceptor
    },
    SongService
  ]
})
export class SongModule {}
