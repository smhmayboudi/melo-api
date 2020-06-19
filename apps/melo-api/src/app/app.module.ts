import {
  ACTION_SERVICE,
  ALBUM_SERVICE,
  ARTIST_SERVICE,
  AT_SERVICE,
  CONST_SERVICE,
  DOWNLOAD_SERVICE,
  EMOTION_SERVICE,
  FILE_SERVICE,
  JWKS_SERVICE,
  PLAYLIST_SERVICE,
  RELATION_SERVICE,
  RT_SERVICE,
  SEARCH_SERVICE,
  SONG_SERVICE,
  USER_SERVICE,
} from "@melo/common";
import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { ActionModule } from "../action/action.module";
import { AlbumModule } from "../album/album.module";
import { ApmModule } from "@melo/apm";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppArtistService } from "./app.artist.service";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "./app.config.service";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppEventsGateway } from "./app.events.gateway";
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
    ClientsModule.register([
      {
        name: ACTION_SERVICE,
        options: { url: process.env.ACTION_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: ALBUM_SERVICE,
        options: { url: process.env.ALBUM_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: ARTIST_SERVICE,
        options: { url: process.env.ARTIST_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: AT_SERVICE,
        options: { url: process.env.AT_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: CONST_SERVICE,
        options: { url: process.env.CONST_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: DOWNLOAD_SERVICE,
        options: { url: process.env.DOWNLOAD_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: EMOTION_SERVICE,
        options: { url: process.env.EMOTION_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: FILE_SERVICE,
        options: { url: process.env.FILE_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: JWKS_SERVICE,
        options: { url: process.env.JWKS_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: PLAYLIST_SERVICE,
        options: { url: process.env.PLAYLIST_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: RELATION_SERVICE,
        options: { url: process.env.RELATION_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: RT_SERVICE,
        options: { url: process.env.RT_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: SEARCH_SERVICE,
        options: { url: process.env.SEARCH_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: SONG_SERVICE,
        options: { url: process.env.SONG_SERVICE_URL },
        transport: Transport.REDIS,
      },
      {
        name: USER_SERVICE,
        options: { url: process.env.USER_SERVICE_URL },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
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
    AppEventsGateway,
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
