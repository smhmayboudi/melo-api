import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import config from "./search.config";
import { SearchConfigService } from "./search.config.service";

describe("SearchCacheOptionsFactory", () => {
  let service: SearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [SearchConfigService]
    }).compile();
    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    expect(new SearchCacheOptionsFactory(service)).toBeDefined();
  });
});
