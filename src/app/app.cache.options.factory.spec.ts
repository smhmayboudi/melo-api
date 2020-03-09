import { Test, TestingModule } from "@nestjs/testing";
import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "./app.config.service";

describe("AppCacheOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppCacheOptionsFactory(service)).toBeDefined();
  });
});
