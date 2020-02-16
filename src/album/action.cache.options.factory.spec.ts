import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { AlbumCacheOptionsFactory } from "./album.cache.options.factory";
import config from "./album.config";
import { AlbumConfigService } from "./album.config.service";

describe("AlbumCacheOptionsFactory", () => {
  let service: AlbumConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [AlbumConfigService]
    }).compile();

    service = module.get<AlbumConfigService>(AlbumConfigService);
  });

  it("should be defined", () => {
    expect(new AlbumCacheOptionsFactory(service)).toBeDefined();
  });
});
