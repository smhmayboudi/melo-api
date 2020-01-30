import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { SearchCacheOptionsFactory } from "./search.cache.options.factory";
import { SearchConfigService } from "./search.config.service";

describe("SearchCacheOptionsFactory", () => {
  let service: SearchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService, SearchConfigService]
    }).compile();

    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    expect(new SearchCacheOptionsFactory(service)).toBeDefined();
  });
});
