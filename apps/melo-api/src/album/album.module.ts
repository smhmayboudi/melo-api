import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ALBUM_SERVICE } from "@melo/common";
import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import { AlbumConfigService } from "./album.config.service";
import { AlbumController } from "./album.controller";
import { AlbumHealthIndicator } from "./album.health.indicator";
import { AlbumService } from "./album.service";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import config from "./album.config";

@Module({
  controllers: [AlbumController],
  exports: [AlbumConfigService, AlbumHealthIndicator, AlbumService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AlbumModule],
      useClass: AlbumCacheOptionsFactory,
    }),
    ClientsModule.register([
      {
        name: ALBUM_SERVICE,
        options: {
          url: process.env.ALBUM_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [AlbumConfigService, AlbumHealthIndicator, AlbumService],
})
export class AlbumModule {}
