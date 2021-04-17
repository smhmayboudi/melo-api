import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { SEARCH_SERVICE } from "@melo/common";
// import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchHealthIndicator } from "./search.health.indicator";
import { SearchService } from "./search.service";
import { SongModule } from "../song/song.module";
import config from "./search.config";

@Module({
  controllers: [SearchController],
  exports: [SearchConfigService, SearchHealthIndicator, SearchService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [SearchModule],
    //   useClass: SearchCacheOptionsFactory,
    // }),
    ClientsModule.register([
      {
        name: SEARCH_SERVICE,
        options: {
          url: process.env.SEARCH_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
    SongModule,
  ],
  providers: [SearchConfigService, SearchHealthIndicator, SearchService],
})
export class SearchModule {}
