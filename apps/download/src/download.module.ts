import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigModule } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadElasticsearchOptionsFactory } from "./download.elasticsearch.options.factory";
import { DownloadEventsGateway } from "./download.events.gateway";
import { DownloadService } from "./download.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SONG_SERVICE } from "@melo/common";
import config from "./download.config";

@Module({
  controllers: [DownloadController],
  exports: [DownloadConfigService, DownloadService],
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
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [DownloadModule],
      useClass: DownloadElasticsearchOptionsFactory,
    }),
  ],
  providers: [DownloadConfigService, DownloadEventsGateway, DownloadService],
})
export class DownloadModule {}
