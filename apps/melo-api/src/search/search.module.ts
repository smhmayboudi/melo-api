import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { DataModule } from "../data/data.module";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchElasticsearchOptionsFactory } from "./search.elasticsearch.options.factory";
import { SearchHealthIndicator } from "./search.health.indicator";
import { SearchService } from "./search.service";
import { SongModule } from "../song/song.module";
import config from "./search.config";

@Module({
  controllers: [SearchController],
  exports: [SearchConfigService, SearchHealthIndicator, SearchService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SearchModule],
      useClass: SearchCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    DataModule,
    ElasticsearchModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SearchModule],
      useClass: SearchElasticsearchOptionsFactory,
    }),
    SongModule,
  ],
  providers: [SearchConfigService, SearchHealthIndicator, SearchService],
})
export class SearchModule {}
