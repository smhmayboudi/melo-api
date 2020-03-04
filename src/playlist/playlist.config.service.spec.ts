import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";

describe("PlaylistService", () => {
  let service: PlaylistConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [PlaylistConfigService]
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);
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

  it("defaultImagePath should be defined", () => {
    expect(service.defaultImagePath).toBeDefined();
  });

  it("imagePath should be defined", () => {
    expect(service.imagePath("")).toBeDefined();
  });
});
