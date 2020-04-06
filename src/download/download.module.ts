/* eslint-disable @typescript-eslint/no-use-before-define */

import { HttpModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadHealthIndicator } from "./download.health.indicator";
import { DownloadHttpOptionsFactory } from "./download.http.options.factory";
import { DownloadService } from "./download.service";
import { SongModule } from "src/song/song.module";
import config from "./download.config";

@Module({
  controllers: [DownloadController],
  exports: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
  imports: [
    forwardRef(() => AppModule),
    ConfigModule.forFeature(config),
    HttpModule.registerAsync({
      imports: [DownloadModule],
      useClass: DownloadHttpOptionsFactory,
    }),
    SongModule,
  ],
  providers: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
})
export class DownloadModule {}
