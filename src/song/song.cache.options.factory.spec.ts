import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { SongCacheOptionsFactory } from "./song.cache.options.factory";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";

describe("SongCacheOptionsFactory", () => {
  let service: SongConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [SongConfigService]
    }).compile();
    service = module.get<SongConfigService>(SongConfigService);
  });

  it("should be defined", () => {
    expect(new SongCacheOptionsFactory(service)).toBeDefined();
  });
});
