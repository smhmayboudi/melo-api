import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumModule } from "./album/album.module";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppService } from "./app.service";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { ArtistModule } from "./artist/artist.module";
import { AtModule } from "./at/at.module";
import { AuthModule } from "./auth/auth.module";
import { ConstModule } from "./const/const.module";
import { DataModule } from "./data/data.module";
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
  exports: [AppConfigService, AppService],
  imports: [
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
    JwksModule,
    PlaylistModule,
    RelationModule,
    RtModule,
    SearchModule,
    SongModule,
    TelegramModule,
    TypeOrmModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [AppModule],
      useClass: AppTypeOrmOptionsFactory
    }),
    UserModule
  ],
  providers: [AppConfigService, AppService]
})
export class AppModule {}
