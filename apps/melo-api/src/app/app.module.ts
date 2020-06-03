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
import { AppDgraphOptionsFactory } from "./app.dgraph.options.factory";
import { AppErrorInterceptor } from "./app.error.interceptor";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AppSongService } from "./app.song.service";
import { AppTypeOrmOptionsFactory } from "./app.type-orm.options.factory";
import { ArtistModule } from "../artist/artist.module";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ConstModule } from "../const/const.module";
import { DATA_TYPEORM } from "@melo/common";
import { DataModule } from "../data/data.module";
import { DataTypeOrmOptionsFactory } from "../data/data.type-orm.options.factory";
import { DgraphModule } from "@melo/dgraph";
import { DownloadModule } from "../download/download.module";
import { EmotionModule } from "../emotion/emotion.module";
import { FileModule } from "../file/file.module";
import { JwksModule } from "../jwks/jwks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistModule } from "../playlist/playlist.module";
import { PromModule } from "@melo/prom";
import { RelationModule } from "../relation/relation.module";
import { RtModule } from "../rt/rt.module";
import { SearchModule } from "../search/search.module";
import { SentryModule } from "@melo/sentry";
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
    DataModule,
    DgraphModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppDgraphOptionsFactory,
    }),
    DownloadModule,
    EmotionModule,
    FileModule,
    JwksModule,
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppMongooseOptionsFactory,
    }),
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
    TypeOrmModule.forRootAsync({
      imports: [DataModule],
      name: DATA_TYPEORM,
      useClass: DataTypeOrmOptionsFactory,
    }),
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
    AppService,
    AppSongService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
