import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionModule } from "./action/action.module";
import { AlbumModule } from "./album/album.module";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppHealthIndicator } from "./app.health";
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
import { TelegramModule } from "./telegram/telegram.module";
import { UserModule } from "./user/user.module";

@Module({
  controllers: [],
  exports: [AppConfigService, AppHealthIndicator, AppService],
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
    ConfigModule.forFeature(config),
    DataModule,
    FileModule,
    JwksModule,
    PlaylistModule,
    RelationModule,
    RtModule,
    SearchModule,
    SongModule,
    TelegramModule,
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
        TelegramModule,
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
  providers: [AppConfigService, AppHealthIndicator, AppService]
})
export class AppModule {}
