import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { ActionModule } from "../action/action.module";
import { AlbumModule } from "../album/album.module";
import { ApmModule } from "@melo/apm";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppArtistService } from "./app.artist.service";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "./app.config.service";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AppSongService } from "./app.song.service";
import { ArtistModule } from "../artist/artist.module";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ConstModule } from "../const/const.module";
import { DownloadModule } from "../download/download.module";
import { EmotionModule } from "../emotion/emotion.module";
import { FileModule } from "../file/file.module";
import { JwksModule } from "../jwks/jwks.module";
import { PlaylistModule } from "../playlist/playlist.module";
import { PromModule } from "@melo/prom";
import { RelationModule } from "../relation/relation.module";
import { RtModule } from "../rt/rt.module";
import { SearchModule } from "../search/search.module";
import { SentryModule } from "@melo/sentry";
import { SongModule } from "../song/song.module";
import { TerminusModule } from "@nestjs/terminus";
import { UserModule } from "../user/user.module";
import config from "./app.config";

@Module({
  controllers: [AppHealthController],
  exports: [
    AppArtistService,
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppService,
    AppSongService,
  ],
  imports: [
    ApmModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppApmOptionsFactory,
    }),
    ActionModule,
    AlbumModule,
    ArtistModule,
    AtModule,
    AuthModule,
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppCacheOptionsFactory,
    }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ConstModule,
    DownloadModule,
    EmotionModule,
    FileModule,
    JwksModule,
    PlaylistModule,
    PromModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppPromOptionsFactory,
    }),
    RelationModule,
    RtModule,
    SearchModule,
    SentryModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppSentryOptionsFactory,
    }),
    SongModule,
    TerminusModule,
    UserModule,
  ],
  providers: [
    AppArtistService,
    AppConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppErrorInterceptor,
    },
    AppHashIdService,
    AppHealthIndicator,
    AppService,
    AppSongService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
