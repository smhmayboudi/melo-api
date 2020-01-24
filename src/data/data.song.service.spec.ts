import { Test, TestingModule } from "@nestjs/testing";
import { DataSongService } from "./data.song.service";

describe("DataSongService", () => {
  let service: DataSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSongService]
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
