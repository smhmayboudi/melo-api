import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataSongService } from "../data/data.song.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { UserService } from "../user/user.service";
import { SongConfigService } from "./song.config.service";
import { SongService } from "./song.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationType } from "../relation/relation.type";
import { AppMixSongServiceInterface } from "src/app/app.mix-song.service.interface";

describe("SongService", () => {
  const releaseDate = new Date();
  const song: DataSongResDto = {
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
    releaseDate,
    title: ""
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1
  } as DataPaginationResDto<DataSongResDto>;

  const appMixSongServiceMock: AppMixSongServiceInterface = {
    mixSong: (): Promise<DataSongResDto[]> => Promise.resolve([song])
  };
  const dataSongServiceMock = {
    byIds: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    genre: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    searchMood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination)
  };
  const httpServiceMock = {
    post: (): number => 0
  };
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
  const songConfigServiceMock = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };
  const userServiceMock = {
    findOneById: () => ({
      id: 0
    })
  };

  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock
        },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile();
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.artistSongs(req, 0, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongsTop")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.artistSongsTop(req, 0, 0)).toBe(res);
  });

  it("byId should return a songs", async () => {
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
      releaseDate,
      title: ""
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));

    expect(await service.byId(req, 0, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "genre").mockImplementation(() => Promise.resolve(res));

    expect(
      await service.genre(params, DataOrderByType.downloads, query, 0)
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "language")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.language(req, DataOrderByType.downloads, 0)).toBe(res);
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
      releaseDate,
      title: ""
    };
    jest.spyOn(service, "like").mockImplementation(() => Promise.resolve(res));

    expect(await service.like(req, 0, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "liked").mockImplementation(() => Promise.resolve(res));

    expect(await service.liked(req, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "mood").mockImplementation(() => Promise.resolve(res));

    expect(await service.mood(req, 0)).toBe(res);
  });

  it("new should return a list of songs", async () => {
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest.spyOn(service, "new").mockImplementation(() => Promise.resolve(res));

    expect(await service.newSong(req, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "newPodcast")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.newPodcast(req, 0)).toBe(res);
  });

  it("podcast should return a list of songs", async () => {
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "podcast")
      .mockImplementation(() => Promise.resolve(res));

    expect(
      await service.podcast(params, query, DataOrderByType.downloads, 0)
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "searchMood")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.searchMood(params, query)).toBe(res);
  });

  it("sendTelegram should return a list of songs", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(service, "sendTelegram")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.sendTelegram(req, 0, 0)).toBe(undefined);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "similar")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.similar(req, 0, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "slider")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.slider(0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "topDay")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.topDay(req, 0)).toBe(res);
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
          releaseDate,
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "topWeek")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.topWeek(req, 0)).toBe(res);
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
      releaseDate,
      title: ""
    };
    jest
      .spyOn(service, "unlike")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.unlike(req, 0, 0)).toBe(res);
  });
});
