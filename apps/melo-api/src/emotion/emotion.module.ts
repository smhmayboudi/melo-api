import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { EMOTION_SERVICE } from "@melo/common";
import { EmotionController } from "./emotion.controller";
import { EmotionHealthIndicator } from "./emotion.health.indicator";
import { EmotionService } from "./emotion.service";
import { SongModule } from "../song/song.module";

@Module({
  controllers: [EmotionController],
  exports: [EmotionHealthIndicator, EmotionService],
  imports: [
    forwardRef(() => AppModule),
    ClientsModule.register([
      {
        name: EMOTION_SERVICE,
        options: {
          url: process.env.EMOTION_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    SongModule,
  ],
  providers: [EmotionHealthIndicator, EmotionService],
})
export class EmotionModule {}
