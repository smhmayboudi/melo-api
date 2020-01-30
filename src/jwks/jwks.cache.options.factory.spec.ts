import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import { JwksConfigService } from "./jwks.config.service";

describe("JwksCacheOptionsFactory", () => {
  let service: JwksConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AppConfigService,
        ConfigService,
        JwksConfigService
      ]
    }).compile();

    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect(new JwksCacheOptionsFactory(service)).toBeDefined();
  });
});
