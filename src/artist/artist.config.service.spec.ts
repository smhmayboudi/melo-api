import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./artist.config";
import { AppModule } from "../app/app.module";
import { ArtistConfigService } from "./artist.config.service";

describe("ArtistService", () => {
  let service: ArtistConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ArtistConfigService]
    }).compile();

    service = module.get<ArtistConfigService>(ArtistConfigService);
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
