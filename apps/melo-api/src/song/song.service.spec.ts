import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  RelationEntityReqDto,
  RelationEntityType,
  RelationMultiHasResDto,
  RelationType,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongConfigReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastGenresReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongSongGenresReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
  UserResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { AxiosResponse } from "axios";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { HttpService } from "@nestjs/common";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongService } from "./song.service";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("SongService", () => {
  const config: SongConfigReqDto = {
    maxSize: 0,
    url: "",
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const releaseDate = new Date();
  const song: SongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    albumSongs: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    artistSongs: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    genre: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    getByIds: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    similar: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
  };
  // TODO: interface ?
  const httpServiceMock = {
    post: (): Observable<AxiosResponse<number>> =>
      of({
        config: {},
        data: 0,
        headers: {},
        status: 200,
        statusText: "",
      }),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<DataPaginationResDto<RelationEntityReqDto>> =>
      Promise.resolve({
        results: [
          {
            id: 0,
            type: RelationEntityType.album,
          },
        ],
        total: 1,
      } as DataPaginationResDto<RelationEntityReqDto>),
    has: (): Promise<boolean> => Promise.resolve(true),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: 0,
            type: RelationEntityType.album,
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: 1,
            type: RelationEntityType.album,
          },
        },
      ]),
    remove: (): Promise<boolean> => Promise.resolve(true),
    set: (): Promise<boolean> => Promise.resolve(true),
  };
  const songConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
    timeout: 0,
    url: "",
  };
  const userServiceMock: UserServiceInterface = {
    edit: (): Promise<UserResDto> => Promise.resolve(user),
    find: (): Promise<UserResDto[]> => Promise.resolve([user]),
    findOne: (): Promise<UserResDto> => Promise.resolve(user),
    findOneByTelegramId: (): Promise<UserResDto> => Promise.resolve(user),
    findOneByUsername: (): Promise<UserResDto | undefined> =>
      Promise.resolve(user),
    get: (): Promise<UserResDto> => Promise.resolve(user),
    save: (): Promise<UserResDto> => Promise.resolve(user),
  };

  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongs(dto)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsTopReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual(songPagination);
  });

  it("get should be equal to a songs", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongSongGenresReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.language(dto)).toEqual(songPagination);
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.like(dto)).toEqual({ ...song, liked: true });
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await service.mood(dto)).toEqual(songPagination);
  });

  it("new should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: SongPodcastGenresReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    expect(await service.sendTelegram(dto)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await service.slider(dto)).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topDay(dto)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topWeek(dto)).toEqual(songPagination);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unlike(dto)).toEqual({ ...song, liked: false });
  });

  it("liked should be equal to an empty list", async () => {
    const relationServiceMockEmptyGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<DataPaginationResDto<RelationEntityReqDto>> =>
        Promise.resolve({
          results: [] as RelationEntityReqDto[],
          total: 0,
        } as DataPaginationResDto<RelationEntityReqDto>),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMockEmptyGet },
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock,
        },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual({ results: [], total: 0 });
  });

  it("sendTelegram should throw exception", async () => {
    const userServiceMockFindOneByIdUndefined: UserServiceInterface = {
      ...userServiceMock,
      findOne: (): Promise<UserResDto | undefined> =>
        Promise.resolve(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        {
          provide: UserService,
          useValue: userServiceMockFindOneByIdUndefined,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    return expect(service.sendTelegram(dto)).rejects.toThrowError();
  });
});
