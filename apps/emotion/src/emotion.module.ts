import { ClientsModule, Transport } from "@nestjs/microservices";

import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { EmotionController } from "./emotion.controller";
import { EmotionService } from "./emotion.service";
import { Module } from "@nestjs/common";
import { SONG_SERVICE } from "@melo/common";

@Module({
  controllers: [EmotionController],
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
    ElasticsearchModule.register({
      node: process.env.EMOTION_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [EmotionService],
})
export class EmotionModule {}
