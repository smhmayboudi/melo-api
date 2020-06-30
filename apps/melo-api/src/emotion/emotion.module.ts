import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { EMOTION_SERVICE } from "@melo/common";
// import { EmotionCacheOptionsFactory } from "./emotion.cache.options.factory";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionController } from "./emotion.controller";
import { EmotionHealthIndicator } from "./emotion.health.indicator";
import { EmotionService } from "./emotion.service";
import { SongModule } from "../song/song.module";
import config from "./emotion.config";

@Module({
  controllers: [EmotionController],
  exports: [EmotionConfigService, EmotionHealthIndicator, EmotionService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [EmotionModule],
    //   useClass: EmotionCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: EMOTION_SERVICE,
        options: {
          url: process.env.EMOTION_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    SongModule,
  ],
  providers: [EmotionConfigService, EmotionHealthIndicator, EmotionService],
})
export class EmotionModule {}
