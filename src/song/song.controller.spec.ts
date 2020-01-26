import { Test, TestingModule } from "@nestjs/testing";
import { SongController } from "./song.controller";

describe("Song Controller", () => {
  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController]
    }).compile();

    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("byId");
  test.todo("genre");
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
