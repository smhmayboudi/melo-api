import {
  CacheModule,
  ClassSerializerInterceptor,
  Module
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionModule } from "../action/action.module";
import { AlbumModule } from "../album/album.module";
import { ApmModule } from "../apm/apm.module";
import { ArtistModule } from "../artist/artist.module";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConstModule } from "../const/const.module";
import { DataModule } from "../data/data.module";
import { FileModule } from "../file/file.module";
import { JwksModule } from "../jwks/jwks.module";
import { PlaylistModule } from "../playlist/playlist.module";
import { PromModule } from "../prom/prom.module";
import { RelationModule } from "../relation/relation.module";
import { RtModule } from "../rt/rt.module";
import { SearchModule } from "../search/search.module";
import { SentryModule } from "../sentry/sentry.module";
import { SongModule } from "../song/song.module";
import { UserModule } from "../user/user.module";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppImgProxyService } from "./app.img-proxy.service";
import { AppMixArtistService } from "./app.mix-artist.service";
import { AppMixSongService } from "./app.mix-song.service";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";

@Module({
  exports: [
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppMixArtistService,
    AppMixSongService,
    AppService
  ],
  imports: [
    ApmModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppApmOptionsFactory
    }),
    ActionModule,
    AlbumModule,
    ArtistModule,
    AtModule,
    AuthModule,
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppCacheOptionsFactory
    }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    ConstModule,
    DataModule,
    FileModule,
    JwksModule,
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppMongooseOptionsFactory
    }),
    PlaylistModule,
    PromModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppPromOptionsFactory
    }),
    RelationModule,
    RtModule,
    SearchModule,
    SentryModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppSentryOptionsFactory
    }),
    SongModule,
    TerminusModule.forRootAsync({
      imports: [
        ActionModule,
        AlbumModule,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        AppModule,
        ArtistModule,
        AtModule,
        AuthModule,
        ConstModule,
        DataModule,
        FileModule,
        JwksModule,
        PlaylistModule,
        RelationModule,
        RtModule,
        SearchModule,
        SongModule,
        UserModule
      ],
      useClass: AppTerminusOptionsFactory
    }),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppTypeOrmOptionsFactory
    }),
    UserModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppErrorInterceptor
    },
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppMixArtistService,
    AppMixSongService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
