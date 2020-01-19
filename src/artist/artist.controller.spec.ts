import { Test, TestingModule } from "@nestjs/testing";
import { ArtistController } from "./artist.controller";

describe("Artist Controller", () => {
  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController]
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("albums");
  test.todo("byId");
  test.todo("follow");
  test.todo("following");
  test.todo("songs");
  test.todo("songs/top");
  test.todo("trending");
  test.todo("trending/genre");
  test.todo("unfollow");
});
