import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataOrderByType } from "./data.order-by.type";
import { DataSongService } from "./data.song.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

describe("DataSongService", () => {
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      id: "",
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.artistSongs(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      id: "",
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.artistSongsTop(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      id: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.byId(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      ids: []
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.byIds(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.genre(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.language(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0,
      mood: ""
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.mood(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.newPodcast(req)).toEqual(data);
  });

  it("newSong should return a list of songs", async () => {
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.newSong(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.podcast(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.searchMood(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      id: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.similar(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.slider()).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementation(() => of(songHttpServiceMock.get()));
    expect(await service.topDay(req)).toEqual(data);
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
    // TODO: interface ?
    const songHttpServiceMock = {
      get: () => ({
        config: {},
        data,
        headers: "",
        status: 0,
        statusText: ""
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataSongService>(DataSongService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(songHttpServiceMock.get()));
    expect(await service.topWeek(req)).toEqual(data);
  });
});
