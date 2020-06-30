import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { PLAYLIST_SERVICE } from "@melo/common";
// import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistHealthIndicator } from "./playlist.health.indicator";
import { PlaylistService } from "./playlist.service";
import config from "./playlist.config";

@Module({
  controllers: [PlaylistController],
  exports: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [PlaylistModule],
    //   useClass: PlaylistCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: PLAYLIST_SERVICE,
        options: {
          url: process.env.PLAYLIST_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [PlaylistConfigService, PlaylistHealthIndicator, PlaylistService],
})
export class PlaylistModule {}
