import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppModule } from "../app/app.module";
import { DataModule } from "../data/data.module";
import { RelationModule } from "../relation/relation.module";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import config from "./artist.config";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistController } from "./artist.controller";
import { ArtistHealthIndicator } from "./artist.health.indicator";
import { ArtistService } from "./artist.service";

@Module({
  controllers: [ArtistController],
  exports: [ArtistConfigService, ArtistHealthIndicator, ArtistService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ArtistModule],
      useClass: ArtistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    RelationModule
  ],
  providers: [ArtistConfigService, ArtistHealthIndicator, ArtistService]
})
export class ArtistModule {}
