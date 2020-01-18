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

  test.todo("song/byId");
  test.todo("song/byIds");
  test.todo("song/genre");
  test.todo("song/language");
  test.todo("song/mood");
  test.todo("song/podcast");
  test.todo("song/new");
  test.todo("song/new/podcast");
  test.todo("song/top/day");
  test.todo("song/top/week");
  test.todo("song/slider/latest");
  test.todo("song/similar");
});
