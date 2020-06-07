import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { RelationModule } from "../relation/relation.module";
import { SONG_SERVICE } from "@melo/common";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongHealthIndicator } from "./song.health.indicator";
import { SongService } from "./song.service";
import { UserModule } from "../user/user.module";
import config from "./song.config";

@Module({
  controllers: [SongController],
  exports: [SongConfigService, SongHealthIndicator, SongService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SongModule],
      useClass: SongCacheOptionsFactory,
    }),
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
    RelationModule,
    UserModule,
  ],
  providers: [SongConfigService, SongHealthIndicator, SongService],
})
export class SongModule {}
