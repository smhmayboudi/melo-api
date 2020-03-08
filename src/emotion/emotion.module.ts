import { forwardRef, HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import config from "./emotion.config";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionController } from "./emotion.controller";
import { EmotionHealthIndicator } from "./emotion.health.indicator";
import { EmotionHttpOptionsFactory } from "./emotion.http.options.factory";
import { EmotionService } from "./emotion.service";

@Module({
  controllers: [EmotionController],
  exports: [EmotionConfigService, EmotionHealthIndicator, EmotionService],
  imports: [
    forwardRef(() => AppModule),
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [EmotionModule],
      useClass: EmotionHttpOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [EmotionConfigService, EmotionHealthIndicator, EmotionService]
})
export class EmotionModule {}
