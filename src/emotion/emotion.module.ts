/* eslint-disable @typescript-eslint/no-use-before-define */

import { HttpModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionController } from "./emotion.controller";
// import { EmotionHealthIndicator } from "./emotion.health.indicator";
import { EmotionHttpOptionsFactory } from "./emotion.http.options.factory";
import { EmotionService } from "./emotion.service";
import { SongModule } from "src/song/song.module";
import config from "./emotion.config";

@Module({
  controllers: [EmotionController],
  exports: [
    EmotionConfigService,
    // EmotionHealthIndicator,
    EmotionService
  ],
  imports: [
    forwardRef(() => AppModule),
    HttpModule.registerAsync({
      imports: [EmotionModule],
      useClass: EmotionHttpOptionsFactory
    }),
    ConfigModule.forFeature(config),
    SongModule
  ],
  providers: [
    EmotionConfigService,
    // EmotionHealthIndicators,
    EmotionService
  ]
})
export class EmotionModule {}
