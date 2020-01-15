import { Test, TestingModule } from "@nestjs/testing";
import { DataService } from "./data.service";

describe("DataService", () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService]
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("search/mood");
  test.todo("search/query");
  test.todo("album");
  test.todo("album/latest");
  test.todo("artist/byId");
  test.todo("artist/byIds");
  test.todo("artist/songs");
  test.todo("artist/songs/top");
  test.todo("artist/albums");
  test.todo("artist/trending");
  test.todo("artist/trending/genre");
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
