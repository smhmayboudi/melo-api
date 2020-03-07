import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./download.config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadHealthIndicator } from "./download.health.indicator";
import { DownloadService } from "./download.service";
import { DownloadHttpOptionsFactory } from "./download.http.options.factory";

@Module({
  controllers: [DownloadController],
  exports: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
  imports: [
    ConfigModule.forFeature(config),
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [DownloadModule],
      useClass: DownloadHttpOptionsFactory
    })
  ],
  providers: [DownloadConfigService, DownloadHealthIndicator, DownloadService]
})
export class DownloadModule {}
