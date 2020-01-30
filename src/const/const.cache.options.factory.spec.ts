import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppQueryStringService } from "../app.query-string.service";
import { AppConfigService } from "../app.config.service";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import { ConstConfigService } from "./const.config.service";

describe("ConstCacheOptionsFactory", () => {
  let service: ConstConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AppQueryStringService,
        ConfigService,
        ConstConfigService
      ]
    }).compile();

    service = module.get<ConstConfigService>(ConstConfigService);
  });

  it("should be defined", () => {
    expect(new ConstCacheOptionsFactory(service)).toBeDefined();
  });
});
