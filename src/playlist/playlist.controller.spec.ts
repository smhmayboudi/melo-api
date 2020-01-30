import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { AppHashIdService } from "../app.hash-id.service";
import { PlaylistController } from "./playlist.controller";

describe("PlaylistController", () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, AppHashIdService],
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
  test.todo("deleteSong");
  test.todo("edit");
  test.todo("get");
  test.todo("my");
  test.todo("top");
});
