import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistType } from "../data/data.artist.type";
import { DataSongService } from "../data/data.song.service";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppModule } from "../app/app.module";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";

describe("PlaylistController", () => {
  let controller: PlaylistController;
  let service: PlaylistService;

  const appImgProxyServiceMock = jest.fn(() => ({
    generateUrl: {
      "": {
        url: ""
      }
    }
  }));

  const dataSongServiceMock = jest.fn(() => ({
    byIds: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.prime
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    }
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        PlaylistConfigService,
        PlaylistService,
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock }
      ]
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("addSong should return a playlist", async () => {
    const req = {
      playlistId: "",
      songId: ""
    };
    const res = {
      followersCount: 0,
      id: "",
      image: {
        "": {
          url: ""
        }
      },
      isPublic: false,
      releaseDate: new Date(),
      title: "",
      tracksCount: 0
    };
    jest
      .spyOn(service, "addSong")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.addSong(req, 0)).toBeDefined();
  });

  test.todo("create");
  test.todo("delete");
  test.todo("deleteSong");
  test.todo("edit");
  test.todo("get");
  test.todo("my");
  test.todo("top");
});
