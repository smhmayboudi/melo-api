import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { DOWNLOAD_SERVICE } from "@melo/common";
import { DownloadController } from "./download.controller";
import { DownloadHealthIndicator } from "./download.health.indicator";
import { DownloadService } from "./download.service";
import { SongModule } from "../song/song.module";

@Module({
  controllers: [DownloadController],
  exports: [DownloadHealthIndicator, DownloadService],
  imports: [
    forwardRef(() => AppModule),
    ClientsModule.register([
      {
        name: DOWNLOAD_SERVICE,
        options: {
          url: process.env.DOWNLOAD_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    SongModule,
  ],
  providers: [DownloadHealthIndicator, DownloadService],
})
export class DownloadModule {}
