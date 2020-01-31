import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataModule } from "./data.module";
import { DataSongService } from "./data.song.service";

describe("DataSongService", () => {
  let service: DataSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(config),
        HttpModule.registerAsync({
          imports: [DataModule],
          useClass: DataHttpModuleOptionsFactory
        })
      ],
      providers: [DataConfigService, DataSongService]
    }).compile();

    service = module.get<DataSongService>(DataSongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("byIds");
  test.todo("genre");
  test.todo("language");
  test.todo("mood");
  test.todo("podcast");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("sliderLatest");
  test.todo("similar");
});
