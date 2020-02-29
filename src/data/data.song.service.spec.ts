import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistType } from "./data.artist.type";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataSongService } from "./data.song.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataOrderByType } from "./data.order-by.type";

describe("DataSongService", () => {
  it("artistSongs should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      id: "",
      limit: 0
    };
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.artistSongs(req)).toBe(data);
  });

  it("artistSongsTop should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      id: "",
      limit: 0
    };
    jest
      .spyOn(service, "artistSongsTop")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.artistSongsTop(req)).toBe(data);
  });

  it("byId should return a songs", async () => {
    const data = {
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
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      id: 0
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(data));

    expect(await service.byId(req)).toBe(data);
  });

  it("byIds should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      ids: []
    };
    jest
      .spyOn(service, "byIds")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.byIds(req)).toBe(data);
  });

  it("genre should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(service, "genre")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.genre(req)).toBe(data);
  });

  it("language should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(service, "language")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.language(req)).toBe(data);
  });

  it("mood should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0,
      mood: ""
    };
    jest.spyOn(service, "mood").mockImplementation(() => Promise.resolve(data));

    expect(await service.mood(req)).toBe(data);
  });

  it("new should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0
    };
    jest.spyOn(service, "new").mockImplementation(() => Promise.resolve(data));

    expect(await service.new(req)).toBe(data);
  });

  it("newPodcast should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(service, "newPodcast")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.newPodcast(req)).toBe(data);
  });

  it("podcast should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(service, "podcast")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.podcast(req)).toBe(data);
  });

  it("searchMood should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(service, "searchMood")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.searchMood(req)).toBe(data);
  });

  it("similar should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      id: 0,
      limit: 0
    };
    jest
      .spyOn(service, "similar")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.similar(req)).toBe(data);
  });

  it("slider should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    jest
      .spyOn(service, "slider")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.slider()).toBe(data);
  });

  it("topDay should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(service, "topDay")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.topDay(req)).toBe(data);
  });

  it("topWeek should return a list of songs", async () => {
    const data = ({
      results: {
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
      },
      total: 1
    } as unknown) as DataPaginationResDto<DataSongResDto>;
    const songHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataSongService,
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(service, "topWeek")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.topWeek(req)).toBe(data);
  });
});
