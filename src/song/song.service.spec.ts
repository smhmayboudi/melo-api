import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AppMixSongService } from "../app/app.mix-song.service";
import { AppMixSongServiceInterface } from "../app/app.mix-song.service.interface";
import { AxiosResponse } from "axios";
import { DataArtistType } from "../data/data.artist.type";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { HttpService } from "@nestjs/common";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongService } from "./song.service";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";
import { UserUserResDto } from "../user/dto/res/user.user.res.dto";

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
  const user: UserUserResDto = {
    id: 0,
    telegram_id: 0
  };

  const appMixSongServiceMock: AppMixSongServiceInterface = {
    mixSong: (): Promise<DataSongResDto[]> => Promise.resolve([song])
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    byIds: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
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
  // TODO: interface ?
  const httpServiceMock = {
    post: (): Observable<AxiosResponse<number>> =>
      of({
        config: {},
        data: 0,
        headers: {},
        status: 200,
        statusText: ""
      })
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
  const songConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    sendTelegramUrl: "",
    timeout: 0
  };
  const userServiceMock: UserServiceInterface = {
    find: (): Promise<UserUserResDto[]> => Promise.resolve([user]),
    findOneById: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    findOneByTelegramId: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    findOneByUsernam: (): Promise<UserUserResDto | undefined> =>
      Promise.resolve(user),
    get: (): Promise<UserUserResDto | undefined> => Promise.resolve(user),
    put: (): Promise<UserUserResDto> => Promise.resolve(user),
    save: (): Promise<UserUserResDto> => Promise.resolve(user)
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

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      artistId: "0",
      from: 0,
      limit: 0
    };
    expect(await service.artistSongs(dto, 0, 0)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsTopReqDto = {
      artistId: "0",
      from: 0,
      limit: 0
    };
    expect(await service.artistSongsTop(dto, 0, 0)).toEqual(songPagination);
  });

  it("byId should be equal to a songs", async () => {
    const dto: SongByIdReqDto = {
      id: ""
    };
    expect(await service.byId(dto, 0, 0)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const paramDto: SongSongGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const queryDto: SongSongGenresQueryReqDto = {
      genres: [""]
    };
    expect(
      await service.genre(DataOrderByType.downloads, paramDto, queryDto, 0)
    ).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    expect(await service.language(dto, DataOrderByType.downloads, 0)).toEqual(
      songPagination
    );
  });

  it("like should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      id: ""
    };
    expect(await service.like(dto, 0, 0)).toEqual({ ...song, liked: true });
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.liked(dto, 0)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      from: 0,
      limit: 0,
      mood: ""
    };
    expect(await service.mood(dto, 0)).toEqual(songPagination);
  });

  it("new should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.newSong(dto, 0)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: DataSongNewPodcastReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.newPodcast(dto, 0)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs", async () => {
    const paramDto: SongPodcastGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const queryDto: SongPodcastGenresQueryReqDto = {
      genres: [""]
    };
    expect(
      await service.podcast(DataOrderByType.downloads, paramDto, queryDto, 0)
    ).toEqual(songPagination);
  });

  it("searchMood should be equal to a list of songs", async () => {
    const paramDto: SongSearchMoodParamDto = {
      from: 0,
      limit: 0
    };
    const queryDto: SongSearchMoodQueryDto = {};
    expect(await service.searchMood(paramDto, queryDto)).toEqual(
      songPagination
    );
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      id: "0"
    };
    expect(await service.sendTelegram(dto, 0, 0)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      from: 0,
      id: "",
      limit: 0
    };
    expect(await service.similar(dto, 0, 0)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    expect(await service.slider(0)).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.topDay(dto, 0)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.topWeek(dto, 0)).toEqual(songPagination);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      id: ""
    };
    expect(await service.unlike(dto, 0, 0)).toEqual({ ...song, liked: false });
  });

  describe("SongService empty get", () => {
    const relationServiceMockEmptyGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
        Promise.resolve({
          results: [] as RelationEntityResDto[],
          total: 0
        } as RelationPaginationResDto<RelationEntityResDto>)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SongService,
          { provide: AppMixSongService, useValue: appMixSongServiceMock },
          { provide: DataSongService, useValue: dataSongServiceMock },
          { provide: HttpService, useValue: httpServiceMock },
          { provide: RelationService, useValue: relationServiceMockEmptyGet },
          {
            provide: SongConfigService,
            useValue: songConfigServiceMock
          },
          { provide: UserService, useValue: userServiceMock }
        ]
      }).compile();
      service = module.get<SongService>(SongService);
    });

    it("liked should be equal to an empty list", async () => {
      const dto: SongLikedReqDto = {
        from: 0,
        limit: 0
      };
      expect(await service.liked(dto, 0)).toEqual({ results: [], total: 0 });
    });
  });

  describe("SongService sendTelegram badRequest", () => {
    const userServiceMockFindOneByIdUndefined: UserServiceInterface = {
      ...userServiceMock,
      findOneById: (): Promise<UserUserResDto | undefined> =>
        Promise.resolve(undefined)
    };

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
          {
            provide: UserService,
            useValue: userServiceMockFindOneByIdUndefined
          }
        ]
      }).compile();
      service = module.get<SongService>(SongService);
    });

    it("sendTelegram should throw exception", async () => {
      const dto: SongSendTelegramReqDto = {
        id: "0"
      };
      return expect(service.sendTelegram(dto, 0, 0)).rejects.toThrowError();
    });
  });
});
