import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtConfigService } from "./rt.config.service";

describe("RtCacheOptionsFactory", () => {
  let service: RtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService, RtConfigService]
    }).compile();

    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect(new RtCacheOptionsFactory(service)).toBeDefined();
  });
});
