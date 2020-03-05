import { forwardRef, HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AppModule } from "../app/app.module";
import { DataArtistType } from "../data/data.artist.type";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataSongService } from "../data/data.song.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { UserService } from "../user/user.service";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";

describe("SongController", () => {
  let controller: SongController;
  let service: SongService;

  const songPaginationResponseMock = {
    results: [
      {
        artists: [
          {
            followersCount: 0,
            id: "",
            type: DataArtistType.feat
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
  };
  const appMixSongServiceMock = jest.fn(() => ({
    mixSong: {
      return: [
        {
          artists: [
            {
              followersCount: 0,
              id: 0,
              type: "prime"
            }
          ],
          audio: {
            high: {
              fingerprint: "",
              url: ""
            }
          },
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ]
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
    },
    artistSongs: songPaginationResponseMock,
    artistSongsTop: songPaginationResponseMock,
    byId: {
      artists: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.feat
        }
      ],
      audio: {},
      duration: 0,
      id: "",
      localized: false,
      releaseDate: new Date(),
      title: ""
    },
    genre: songPaginationResponseMock,
    language: songPaginationResponseMock,
    mood: songPaginationResponseMock,
    newPodcast: songPaginationResponseMock,
    newSong: songPaginationResponseMock,
    podcast: songPaginationResponseMock,
    searchMood: songPaginationResponseMock,
    similar: songPaginationResponseMock,
    slider: songPaginationResponseMock,
    topDay: songPaginationResponseMock,
    topWeek: songPaginationResponseMock
  }));

  const songHttpServiceMock = jest.fn(() => ({
    post: 0
  }));

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: "",
            type: RelationEntityType.album
          }
        ],
        total: 1
      } as RelationPaginationResDto<RelationEntityResDto>),
    has: (): Promise<void> => Promise.resolve(undefined),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: "0",
            type: RelationEntityType.album
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: "1",
            type: RelationEntityType.album
          }
        }
      ]),
    remove: (): Promise<void> => Promise.resolve(undefined),
    set: (): Promise<void> => Promise.resolve(undefined)
  };

  const userServiceMock = jest.fn(() => ({
    findOneById: {
      id: 0
    }
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        SongConfigService,
        SongService,
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile();
    controller = module.get<SongController>(SongController);
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistSongs should return a list of songs", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.artistSongs(req, 0, 0)).toBe(res);
  });

  it("artistSongsTop should return a list of songs", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.artistSongs(req, 0, 0)).toBe(res);
  });

  it("byId should return a song", async () => {
    const req = {
      id: ""
    };
    const res = {
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
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));

    expect(await controller.byId(req, 0, 0)).toBe(res);
  });

  it("genre should return a list of songs", async () => {
    const params = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const query = {
      genres: [""]
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "genre").mockImplementation(() => Promise.resolve(res));

    expect(
      await controller.genre(DataOrderByType.downloads, params, query, 0)
    ).toBe(res);
  });

  it("language should return a list of songs", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "language")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.language(DataOrderByType.downloads, req, 0)).toBe(
      res
    );
  });

  it("like should return a songs", async () => {
    const req = {
      id: ""
    };
    const res = {
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
    };
    jest.spyOn(service, "like").mockImplementation(() => Promise.resolve(res));

    expect(await controller.like(req, 0, 0)).toBe(res);
  });

  it("liked should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "liked").mockImplementation(() => Promise.resolve(res));

    expect(await controller.liked(req, 0)).toBe(res);
  });

  it("mood should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0,
      mood: ""
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "mood").mockImplementation(() => Promise.resolve(res));

    expect(await controller.mood(req, 0)).toBe(res);
  });

  it("newPodcast should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "newPodcast")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.newPodcast(req, 0)).toBe(res);
  });

  it("newSong should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "newSong")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.newSong(req, 0)).toBe(res);
  });

  it("podcastGenre should return a list of songs", async () => {
    const params = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const query = {
      genres: [""]
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "podcast")
      .mockImplementation(() => Promise.resolve(res));

    expect(
      await controller.podcast(DataOrderByType.downloads, params, query, 0)
    ).toBe(res);
  });

  it("searchMood should return a list of songs", async () => {
    const params = {
      from: 0,
      limit: 0
    };
    const query = {};
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "searchMood")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.searchMood(params, query)).toBe(res);
  });

  it("sendTelegram should be defined", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(service, "sendTelegram")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await controller.sendTelegram(req, 0, 0)).toBe(undefined);
  });

  it("similar should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0,
      id: ""
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "similar")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.similar(req, 0, 0)).toBe(res);
  });

  it("slider should return a list of songs", async () => {
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "slider")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.slider(0)).toBe(res);
  });

  it("topDay should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "topDay")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.topDay(req, 0)).toBe(res);
  });

  it("topWeek should return a list of songs", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
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
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "topWeek")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.topWeek(req, 0)).toBe(res);
  });

  it("unlike should return a songs", async () => {
    const req = {
      id: ""
    };
    const res = {
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
    };
    jest
      .spyOn(service, "unlike")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.unlike(req, 0, 0)).toBe(res);
  });
});
