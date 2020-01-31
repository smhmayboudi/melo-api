import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { ArtistCacheOptionsFactory } from "./artist.cache.options.factory";
import config from "./artist.config";
import { ArtistConfigService } from "./artist.config.service";

describe("ArtistCacheOptionsFactory", () => {
  let service: ArtistConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [ArtistConfigService]
    }).compile();

    service = module.get<ArtistConfigService>(ArtistConfigService);
  });

  it("should be defined", () => {
    expect(new ArtistCacheOptionsFactory(service)).toBeDefined();
  });
});
