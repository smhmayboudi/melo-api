import { ClientsModule, Transport } from "@nestjs/microservices";

import { ConfigModule } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SONG_SERVICE } from "@melo/common";
import config from "./download.config";

@Module({
  controllers: [DownloadController],
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
    ElasticsearchModule.register({
      node: process.env.DOWNLOAD_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [DownloadConfigService, DownloadService],
})
export class DownloadModule {}
