import {
  ALBUM_SERVICE,
  ARTIST_SERVICE,
  AlbumResDto,
  ArtistResDto,
  CONST_SERVICE,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataSearchType,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
  SongAlbumSongsReqDto,
  SongArtistSongsReqDto,
  SongAudioResDto,
  SongConfigReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
  USER_SERVICE,
  UserResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";

import { AxiosResponse } from "axios";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { HttpService } from "@nestjs/common";
import { SongCacheEntity } from "./song.cache.entity";
import { SongService } from "./song.service";
import { SongSiteEntity } from "./song.site.entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("SongService", () => {
  const config: SongConfigReqDto = {
    maxSize: 0,
    sendUrl: "",
  };
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
  };
  const artistElastic: DataElasticsearchArtistResDto = {
    available: false,
    dataConfigElasticsearch,
    dataConfigImage,
    followers_count: 0,
    full_name: "",
    has_cover: false,
    id: 0,
    popular: false,
    sum_downloads_count: 1,
    tags: [
      {
        tag: "",
      },
    ],
    type: DataArtistType.prime,
  };
  const releaseDate = new Date();
  const searchElastic: DataElasticsearchSearchResDto = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [artistElastic],
    copyright: false,
    dataConfigElasticsearch,
    dataConfigImage,
    downloads_count: 0,
    duration: 0,
    has_cover: false,
    has_video: false,
    id: 0,
    localize: false,
    lyrics: "",
    max_audio_rate: 0,
    release_date: releaseDate,
    suggested: 0,
    tags: [
      {
        tag: "",
      },
    ],
    title: "",
    type: DataSearchType.album,
    unique_name: "",
  };
  // TODO: interface ?
  const elasticGetRes = {
    body: {
      _source: {
        ...searchElastic,
        moods: {
          classy: 0,
        },
      },
    },
  };
  // TODO: interface ?
  const elasticSearchRes = {
    body: {
      hits: {
        hits: [
          {
            _source: searchElastic,
          },
        ],
      },
    },
  };
  const image: ConstImageResDto = {
    cover: {
      url:
        "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
  };
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };
  const dataCache: SongCacheEntity = {
    date: releaseDate,
    id: 0,
    name: "",
    result: `[{ "id": 0, "type": "${DataSearchType.song}" }]`,
  };
  const songSite: SongSiteEntity = {
    created_at: releaseDate,
    song_id: 0,
  };

  // TODO: interface ?
  const albumClientProxyMock = {
    send: () => of(album),
  };
  // TODO: interface ?
  const artistClientProxyMock = {
    send: () => of(artist),
  };
  // TODO: interface ?
  const constClientProxyMock = {
    send: () =>
      of({
        cover: {
          url:
            "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
        },
      }),
  };
  // TODO: interface ?
  const relationClientProxyMock = {
    send: (token: string) =>
      token === RELATION_SERVICE_GET ? of([relation]) : of(true),
  };
  // TODO: interface ?
  const userClientProxyMock = {
    send: () => of(user),
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
  // TODO: interface ?
  const songCacheEntityRepositoryMock = {
    createQueryBuilder: () => ({
      where: () => ({
        orderBy: () => ({
          limit: () => ({
            getOne: () => Promise.resolve(dataCache),
          }),
        }),
      }),
    }),
  };
  // TODO: interface ?
  const songSiteEntityRepositoryMock = {
    createQueryBuilder: () => ({
      orderBy: () => ({
        getMany: () => Promise.resolve([songSite]),
      }),
    }),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(elasticSearchRes),
  };

  let service: SongService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("albumSongs should be equal to a list of songs", async () => {
    const dto: SongAlbumSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.albumSongs(dto)).toEqual([song]);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs, genre all", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.release,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
  });

  it("getByIds should be equal to a list of songs", async () => {
    const dto: SongGetByIdsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      ids: [],
    };
    expect(await service.getByIds(dto)).toEqual([song]);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.language(dto)).toEqual([song]);
  });

  it("like should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      dataConfigElasticsearch,
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
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual([song]);
  });

  it("liked should be equal to a list of songs 2", async () => {
    // TODO: interface ?
    const relationClientProxyMock = {
      send: (): Observable<RelationResDto[]> => of([]),
    };

    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual([]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 1,
    };
    expect(await service.newPodcast(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs 2", async () => {
    // TODO: interface ?
    const songCacheEntityRepositoryMock = {
      createQueryBuilder: () => ({
        where: () => ({
          orderBy: () => ({
            limit: () => ({
              getOne: () => Promise.resolve(undefined),
            }),
          }),
        }),
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongNewPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual([]);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: SongPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs genres all", async () => {
    const dto: SongPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual([song]);
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
    const userClientProxyMock = {
      send: () =>
        of({
          ...user,
          telegram_id: undefined,
        }),
    };
    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
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

  it("sendTelegram should be undefined 3", async () => {
    // TODO: interface ?
    const userClientProxyMock = {
      send: () => of(undefined),
    };
    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
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

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual([song]);
  });

  it("similar should be equal to a list of songs 2", async () => {
    // TODO: interface ?
    const elasticGetRes = {
      body: {
        _source: searchElastic,
      },
    };
    // TODO: interface ?
    const elasticsearchServiceMockGet = {
      ...elasticsearchServiceMock,
      get: () => Promise.resolve(elasticGetRes),
    };

    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockGet,
        },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
        {
          provide: getRepositoryToken(SongCacheEntity),
          useValue: songCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(SongSiteEntity),
          useValue: songSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);
    const dto: SongSimilarReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual([]);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
    };
    expect(await service.slider(dto)).toEqual([song]);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topDay(dto)).toEqual([song]);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topWeek(dto)).toEqual([song]);
  });

  it("transform should be equal to a song 2", async () => {
    expect(
      await service.transform({
        ...searchElastic,
        localize: undefined,
        tags: undefined,
        title: undefined,
      })
    ).toEqual({
      ...song,
      album: {
        ...album,
        tags: [""],
      },
      tags: undefined,
    });
  });

  it("transform should be equal to a song 3", async () => {
    expect(
      await service.transform({
        ...searchElastic,
        has_cover: true,
        localize: true,
        max_audio_rate: 320,
      })
    ).toEqual({
      ...song,
      audio: {
        ...audio,
        high: {
          fingerprint: "",
          url: "-320.mp3",
        },
        medium: {
          ...audio.medium,
          url: "-128.mp3",
        },
      },
      localized: true,
    });
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      dataConfigElasticsearch,
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
