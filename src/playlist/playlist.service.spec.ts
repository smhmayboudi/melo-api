import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "src/data/data.config.service";
import { AppConfigService } from "../app.config.service";
import { AppImgProxyService } from "../app.img-proxy.service";
import { DataSongService } from "../data/data.song.service";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AppImgProxyService,
        ConfigService,
        DataConfigService,
        DataSongService,
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
