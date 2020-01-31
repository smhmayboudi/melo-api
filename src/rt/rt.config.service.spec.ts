import { Test, TestingModule } from "@nestjs/testing";
import { RtConfigService } from "./rt.config.service";
import config from "./rt.config";
import { forwardRef } from "@nestjs/common";
import { AppModule } from "../app.module";
import { ConfigModule } from "@nestjs/config";

describe("RtService", () => {
  let service: RtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [RtConfigService]
    }).compile();

    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
});
