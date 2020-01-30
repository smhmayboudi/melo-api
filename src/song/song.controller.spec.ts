import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { AppHashIdService } from "../app.hash-id.service";
import { SongController } from "./song.controller";

describe("SongController", () => {
  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [AppConfigService, AppHashIdService, ConfigService]
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
