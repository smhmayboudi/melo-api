import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigModule } from "@nestjs/config";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionController } from "./emotion.controller";
import { EmotionEventsGateway } from "./emotion.events.gateway";
import { EmotionService } from "./emotion.service";
import { Module } from "@nestjs/common";
import { SONG_SERVICE } from "@melo/common";
import config from "./emotion.config";

@Module({
  controllers: [EmotionController],
  exports: [EmotionConfigService, EmotionService],
  imports: [
    ClientsModule.register([
      {
        name: SONG_SERVICE,
        options: {
          url: process.env.SONG_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
  ],
  providers: [EmotionConfigService, EmotionEventsGateway, EmotionService],
})
export class EmotionModule {}
