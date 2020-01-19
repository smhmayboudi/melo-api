import { Test, TestingModule } from "@nestjs/testing";
import { PlaylistController } from "./playlist.controller";

describe("Playlist Controller", () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController]
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("addSong");
  test.todo("create");
  test.todo("delete");
  test.todo("edit");
  test.todo("get");
  test.todo("my");
  test.todo("song");
  test.todo("top");
});
