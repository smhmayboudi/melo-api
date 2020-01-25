import { Test, TestingModule } from "@nestjs/testing";
import { SongService } from "./song.service";

describe("SongService", () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongService]
    }).compile();

    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("genre");
  test.todo("get");
  test.todo("language");
  test.todo("like");
  test.todo("liked");
  test.todo("mood");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("podcastGenres");
  test.todo("sendTelegram");
  test.todo("similar");
  test.todo("sliderLatest");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("unlike");
});
