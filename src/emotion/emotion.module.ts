/* eslint-disable @typescript-eslint/no-use-before-define */

import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionController } from "./emotion.controller";
import { EmotionElasticsearchOptionsFactory } from "./emotion.elasticsearch.options.factory";
import { EmotionHealthIndicator } from "./emotion.health.indicator";
import { EmotionService } from "./emotion.service";
import { SongModule } from "../song/song.module";
import config from "./emotion.config";

@Module({
  controllers: [EmotionController],
  exports: [EmotionConfigService, EmotionHealthIndicator, EmotionService],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      imports: [EmotionModule],
      useClass: EmotionElasticsearchOptionsFactory,
    }),
    SongModule,
  ],
  providers: [EmotionConfigService, EmotionHealthIndicator, EmotionService],
})
export class EmotionModule {}
