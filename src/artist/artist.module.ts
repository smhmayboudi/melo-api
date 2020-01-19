import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import config from "./artist.config";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
  controllers: [ArtistController],
  exports: [ArtistConfigService, ArtistService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [ArtistModule],
      useClass: ArtistCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [ArtistConfigService, ArtistService]
})
export class ArtistModule {}
