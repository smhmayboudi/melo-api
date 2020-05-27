import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadElasticsearchOptionsFactory } from "./download.elasticsearch.options.factory";
import { DownloadHealthIndicator } from "./download.health.indicator";
import { DownloadService } from "./download.service";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SongModule } from "../song/song.module";
import config from "./download.config";

@Module({
  controllers: [DownloadController],
  exports: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [DownloadModule],
      useClass: DownloadElasticsearchOptionsFactory,
    }),
    SongModule,
  ],
  providers: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
})
export class DownloadModule {}
