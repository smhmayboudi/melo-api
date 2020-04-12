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
import { AppArtist } from "./app.artist";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppCheckLikeService } from "./app.song";
import { AppConfigService } from "./app.config.service";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppImgProxyService } from "./app.img-proxy.service";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { ArtistModule } from "../artist/artist.module";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ConstModule } from "../const/const.module";
import { DataModule } from "../data/data.module";
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
  exports: [
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppArtist,
    AppCheckLikeService,
    AppService,
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
    TerminusModule.forRootAsync({
      imports: [
        ActionModule,
        AlbumModule,
        AppModule,
        ArtistModule,
        AtModule,
        AuthModule,
        ConstModule,
        DataModule,
        DownloadModule,
        EmotionModule,
        FileModule,
        JwksModule,
        PlaylistModule,
        RelationModule,
        RtModule,
        SearchModule,
        SongModule,
        UserModule,
      ],
      useClass: AppTerminusOptionsFactory,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppModule],
      useClass: AppTypeOrmOptionsFactory,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppErrorInterceptor,
    },
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppArtist,
    AppCheckLikeService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
