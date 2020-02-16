import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { ConstCacheOptionsFactory } from "./const.cache.options.factory";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";

describe("ConstCacheOptionsFactory", () => {
  let service: ConstConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ConstConfigService]
    }).compile();

    service = module.get<ConstConfigService>(ConstConfigService);
  });

  it("should be defined", () => {
    expect(new ConstCacheOptionsFactory(service)).toBeDefined();
  });
});
