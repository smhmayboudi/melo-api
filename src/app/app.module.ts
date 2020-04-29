/* eslint-disable @typescript-eslint/no-use-before-define */

import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from "@nestjs/common";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { ActionModule } from "../action/action.module";
import { AlbumModule } from "../album/album.module";
import { ApmModule } from "../apm/apm.module";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppArtistService } from "./app.artist.service";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "./app.config.service";
import { AppDgraphOptionsFactory } from "./app.dgraph.options.factory";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppImgProxyService } from "./app.img-proxy.service";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AppSongService } from "./app.song.service";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { ArtistModule } from "../artist/artist.module";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ConstModule } from "../const/const.module";
import { DataModule } from "../data/data.module";
import { DgraphModule } from "../dgraph/dgraph.module";
import { DownloadModule } from "../download/download.module";
import { EmotionModule } from "../emotion/emotion.module";
import { FileModule } from "../file/file.module";
import { JwksModule } from "../jwks/jwks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistModule } from "../playlist/playlist.module";
import { PromModule } from "../prom/prom.module";
import { RelationModule } from "../relation/relation.module";
import { RtModule } from "../rt/rt.module";
import { SearchModule } from "../search/search.module";
import { SentryModule } from "../sentry/sentry.module";
import { SongModule } from "../song/song.module";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import config from "./app.config";

@Module({
  controllers: [AppHealthController],
  exports: [
    AppArtistService,
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppService,
    AppSongService,
  ],
  imports: [
    ApmModule.registerAsync({
      imports: [AppModule],
      useClass: AppApmOptionsFactory,
    }),
    ActionModule,
    AlbumModule,
    ArtistModule,
    AtModule,
    AuthModule,
    CacheModule.registerAsync({
      imports: [AppModule],
      useClass: AppCacheOptionsFactory,
    }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ConstModule,
    DataModule,
    DgraphModule.forRootAsync({
      imports: [AppModule],
      useClass: AppDgraphOptionsFactory,
    }),
    DownloadModule,
    EmotionModule,
    FileModule,
    JwksModule,
    MongooseModule.forRootAsync({
      imports: [AppModule],
      useClass: AppMongooseOptionsFactory,
    }),
    PlaylistModule,
    PromModule.forRootAsync({
      imports: [AppModule],
      useClass: AppPromOptionsFactory,
    }),
    RelationModule,
    RtModule,
    SearchModule,
    SentryModule.forRootAsync({
      imports: [AppModule],
      useClass: AppSentryOptionsFactory,
    }),
    SongModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [AppModule],
      useClass: AppTypeOrmOptionsFactory,
    }),
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
    AppImgProxyService,
    AppService,
    AppSongService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
