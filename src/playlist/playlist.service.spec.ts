import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        ConfigService,
        PlaylistConfigService,
        PlaylistService
      ]
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
