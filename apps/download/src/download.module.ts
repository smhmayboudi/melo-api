import { ClientsModule, Transport } from "@nestjs/microservices";

import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from "@nestjs/common";
import { SONG_SERVICE } from "@melo/common";

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
    ElasticsearchModule.register({
      node: process.env.DOWNLOAD_ELASTICSEARCH_NODE,
    }),
  ],
  providers: [DownloadService],
})
export class DownloadModule {}
