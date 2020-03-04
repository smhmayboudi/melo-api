import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppModule } from "../app/app.module";
import { DataArtistType } from "../data/data.artist.type";
import { DataSongService } from "../data/data.song.service";
import config from "./playlist.config";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";

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
    byIds: [
      {
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
    ]
  }));

  const playlistRespose = {
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
  const playlistModelMock = jest.fn(() => ({
    save: playlistRespose,
    findById: playlistRespose,
    findOne: playlistRespose
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        PlaylistConfigService,
        PlaylistService,
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: getModelToken("Playlist"), useValue: playlistModelMock }
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

  it("create should return a playlist", async () => {
    const req = {
      title: ""
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
      .spyOn(service, "create")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.create(req, 0)).toBe(res);
  });

  it("delete should return a playlist", async () => {
    const req = {
      id: ""
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
      .spyOn(service, "delete")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.delete(req, 0)).toBe(res);
  });

  it("deleteSong should return a playlist", async () => {
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
      .spyOn(service, "deleteSong")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.deleteSong(req, 0)).toBe(res);
  });

  it("edit should return a playlist", async () => {
    const req = {
      id: ""
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
    jest.spyOn(service, "edit").mockImplementation(() => Promise.resolve(res));

    expect(await controller.edit(req)).toBe(res);
  });

  it("get should return a playlist", async () => {
    const req = {
      id: ""
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
    jest.spyOn(service, "get").mockImplementation(() => Promise.resolve(res));

    expect(await controller.get(req)).toBe(res);
  });

  it("my should return a list of  playlists", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = ({
      results: [
        {
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
        }
      ],
      total: 1
    } as unknown) as DataPaginationResDto<DataPlaylistResDto>;
    jest.spyOn(service, "my").mockImplementation(() => Promise.resolve(res));

    expect(await controller.my(req, 0)).toBe(res);
  });

  it("top should return a list of  playlists", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = ({
      results: [
        {
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
        }
      ],
      total: 1
    } as unknown) as DataPaginationResDto<DataPlaylistResDto>;
    jest.spyOn(service, "top").mockImplementation(() => Promise.resolve(res));

    expect(await controller.top(req)).toBe(res);
  });
});
