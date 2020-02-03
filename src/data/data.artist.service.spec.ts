import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistService } from "./data.artist.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataModule } from "./data.module";

describe("DataArtistService", () => {
  let service: DataArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(config),
        HttpModule.registerAsync({
          imports: [DataModule],
          useClass: DataHttpModuleOptionsFactory
        })
      ],
      providers: [DataConfigService, DataArtistService]
    }).compile();

    service = module.get<DataArtistService>(DataArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("byIds");
  test.todo("trending");
  test.todo("trendingGenre");
});
