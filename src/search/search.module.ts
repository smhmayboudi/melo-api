import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { AppModule } from "../app.module";

@Module({
  controllers: [SearchController],
  exports: [SearchConfigService, SearchService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [SearchModule],
      useClass: SearchCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [SearchConfigService, SearchService]
})
export class SearchModule {}
