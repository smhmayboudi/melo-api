import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionModule } from "./action/action.module";
import { AlbumModule } from "./album/album.module";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppImgProxyService } from "./app.img-proxy.service";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";
import { AppQueryStringService } from "./app.query-string.service";
import { AppService } from "./app.service";
import { AppTerminusOptionsFactory } from "./app.terminus.options.factory";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { ArtistModule } from "./artist/artist.module";
import { AtModule } from "./at/at.module";
import { AuthModule } from "./auth/auth.module";
import { ConstModule } from "./const/const.module";
import { DataModule } from "./data/data.module";
import { FileModule } from "./file/file.module";
import { JwksModule } from "./jwks/jwks.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { RelationModule } from "./relation/relation.module";
import { RtModule } from "./rt/rt.module";
import { SearchModule } from "./search/search.module";
import { SongModule } from "./song/song.module";
import { UserModule } from "./user/user.module";

@Module({
  controllers: [],
  exports: [
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppQueryStringService,
    AppService
  ],
  imports: [
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
    ConstModule,
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    DataModule,
    FileModule,
    JwksModule,
    // MongooseModule.forRoot("mongodb://localhost:27017/test"), // TODO: change url
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppMongooseOptionsFactory
    }),
    PlaylistModule,
    RelationModule,
    RtModule,
    SearchModule,
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
    AppConfigService,
    AppHashIdService,
    AppHealthIndicator,
    AppImgProxyService,
    AppQueryStringService,
    AppService
  ]
})
export class AppModule {}
