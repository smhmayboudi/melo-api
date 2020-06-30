import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DOWNLOAD_SERVICE } from "@melo/common";
// import { DownloadCacheOptionsFactory } from "./download.cache.options.factory";
import { DownloadConfigService } from "./download.config.service";
import { DownloadController } from "./download.controller";
import { DownloadHealthIndicator } from "./download.health.indicator";
import { DownloadService } from "./download.service";
import { SongModule } from "../song/song.module";
import config from "./download.config";

@Module({
  controllers: [DownloadController],
  exports: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [DownloadModule],
    //   useClass: DownloadCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: DOWNLOAD_SERVICE,
        options: {
          url: process.env.DOWNLOAD_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    SongModule,
  ],
  providers: [DownloadConfigService, DownloadHealthIndicator, DownloadService],
})
export class DownloadModule {}
