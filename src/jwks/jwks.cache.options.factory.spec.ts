import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import config from "./jwks.config";
import { JwksConfigService } from "./jwks.config.service";

describe("JwksCacheOptionsFactory", () => {
  let service: JwksConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [JwksConfigService]
    }).compile();

    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect(new JwksCacheOptionsFactory(service)).toBeDefined();
  });
});
