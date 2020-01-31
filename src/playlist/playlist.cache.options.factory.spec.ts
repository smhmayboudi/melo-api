import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { PlaylistCacheOptionsFactory } from "./playlist.cache.options.factory";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";

describe("PlaylistCacheOptionsFactory", () => {
  let service: PlaylistConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [PlaylistConfigService]
    }).compile();

    service = module.get<PlaylistConfigService>(PlaylistConfigService);
  });

  it("should be defined", () => {
    expect(new PlaylistCacheOptionsFactory(service)).toBeDefined();
  });
});
