import { MetricType, PromModule } from "@digikare/nestjs-prom";
import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { AppModule } from "../app/app.module";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchHealthIndicator } from "./search.health.indicator";
import { SearchService } from "./search.service";
import { SongModule } from "../song/song.module";

@Module({
  controllers: [SearchController],
  exports: [SearchConfigService, SearchHealthIndicator, SearchService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SearchModule],
      useClass: SearchCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    DataModule,
    PromModule.forMetrics([
      {
        type: MetricType.Counter,
        configuration: {
          help: "search counter",
          labelNames: ["function", "module", "service"],
          name: "search_counter"
        }
      }
    ]),
    SongModule
  ],
  providers: [SearchConfigService, SearchHealthIndicator, SearchService]
})
export class SearchModule {}
