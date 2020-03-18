/* eslint-disable @typescript-eslint/no-use-before-define */

import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppModule } from "../app/app.module";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistController } from "./artist.controller";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
// import { ArtistHealthIndicator } from "./artist.health.indicator";
import { ArtistService } from "./artist.service";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import config from "./artist.config";

@Module({
  controllers: [ArtistController],
  exports: [
    ArtistConfigService,
    // ArtistHealthIndicator,
    ArtistService
  ],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      imports: [ArtistModule],
      useClass: ArtistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    RelationModule
  ],
  providers: [
    ArtistConfigService,
    //  ArtistHealthIndicator,
    { provide: APP_INTERCEPTOR, useClass: ArtistLocalizeInterceptor },
    ArtistService
  ]
})
export class ArtistModule {}
