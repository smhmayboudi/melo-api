import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "../data/data.config.service";
import { DataSongService } from "../data/data.song.service";
import { SongService } from "./song.service";

describe("SongService", () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        DataConfigService,
        DataSongService,
        HttpService,
        SongService
      ]
    }).compile();

    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("byId");
  test.todo("genre");
  test.todo("language");
  test.todo("like");
  test.todo("liked");
  test.todo("mood");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("podcast");
  test.todo("sendTelegram");
  test.todo("similar");
  test.todo("sliderLatest");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("unlike");
});
