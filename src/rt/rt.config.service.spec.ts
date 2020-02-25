import { Test, TestingModule } from "@nestjs/testing";
import { RtConfigService } from "./rt.config.service";
import config from "./rt.config";
import { forwardRef } from "@nestjs/common";
import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";

describe("RtService", () => {
  let service: RtConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [RtConfigService]
    }).compile();

    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost should be defined", () => {
    expect(service.cacheHost).toBeDefined();
  });

  it("cacheMax should be defined", () => {
    expect(service.cacheMax).toBeDefined();
  });

  it("cachePort should be defined", () => {
    expect(service.cachePort).toBeDefined();
  });

  it("cacheStore should be defined", () => {
    expect(service.cacheStore).toBeDefined();
  });

  it("cacheTTL should be defined", () => {
    expect(service.cacheTTL).toBeDefined();
  });
});
