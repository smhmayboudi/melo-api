import {
  DATA_SERVICE,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  RELATION_SERVICE,
  RelationEntityReqDto,
  RelationEntityType,
  SongArtistSongsReqDto,
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
  USER_SERVICE,
  UserResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/common";
import { SongService } from "./song.service";

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
  const relation: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relationPagination: DataPaginationResDto<RelationEntityReqDto> = {
    results: [relation],
    total: 1,
  } as DataPaginationResDto<RelationEntityReqDto>;
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

  // TODO: interface ?
  const clientProxyDataMock = {
    send: (): Observable<DataPaginationResDto<SongResDto>> =>
      of(songPagination),
  };
  // TODO: interface ?
  const clientProxyRelationMock = {
    send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
      of(relationPagination),
  };
  // TODO: interface ?
  const clientProxyUserMock = {
    send: (): Observable<UserResDto> => of(user),
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

  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
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
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual(songPagination);
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

  it("get should be equal to a song", async () => {
    // TODO: interface ?
    const clientProxyDataMock = {
      send: (): Observable<SongResDto> => of(song),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
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

  it("like should be equal to a songs", async () => {
    // TODO: interface ?
    const clientProxyDataMock = {
      send: (): Observable<SongResDto> => of(song),
    };
    // TODO: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<boolean> => of(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongLikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.like(dto)).toEqual({
      ...song,
      liked: true,
    });
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

  it("liked should be equal to a list of songs 2", async () => {
    // TODO: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<DataPaginationResDto<RelationEntityReqDto>> =>
        of({
          results: [] as RelationEntityReqDto[],
          total: 0,
        } as DataPaginationResDto<RelationEntityReqDto>),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
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
    expect(await service.liked(dto)).toEqual({
      results: [] as SongResDto[],
      total: 0,
    } as DataPaginationResDto<SongResDto>);
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

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual(songPagination);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual(songPagination);
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

  it("sendTelegram should be undefined 2", async () => {
    // TODO: interface ?
    const clientProxyUserMock = {
      send: (): Observable<UserResDto> =>
        of({
          ...user,
          telegram_id: undefined,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
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
    // TODO: interface ?
    const clientProxyDataMock = {
      send: (): Observable<SongResDto> => of(song),
    };
    // TODO: interface ?
    const clientProxyRelationMock = {
      send: (): Observable<boolean> => of(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: clientProxyDataMock },
        { provide: RELATION_SERVICE, useValue: clientProxyRelationMock },
        { provide: USER_SERVICE, useValue: clientProxyUserMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongUnlikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unlike(dto)).toEqual({
      ...song,
      liked: false,
    });
  });
});
