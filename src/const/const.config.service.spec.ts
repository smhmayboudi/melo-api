import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppQueryStringService } from "../app.query-string.service";
import { AppConfigService } from "../app.config.service";
import { ConstConfigService } from "./const.config.service";

describe("ConstService", () => {
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
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
  test.todo("staticImagePaths");
});
