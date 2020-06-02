import {
  AlbumResDto,
  ArtistResDto,
  ConstImageResDto,
  DATA_TYPEORM,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataSearchType,
  SongAlbumSongsReqDto,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongAudioResDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataCacheEntity } from "./data.cache.entity";
import { DataSiteEntity } from "./data.site.entity";
import { DataSongService } from "./data.song.service";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("DataSongService", () => {
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
  const dataCache: DataCacheEntity = {
    date: releaseDate,
    id: 0,
    name: "",
    result: `[{ "id": 0, "type": "${DataSearchType.song}" }]`,
  };
  const dataSite: DataSiteEntity = {
    created_at: releaseDate,
    song_id: 0,
  };

  // TODO: interface ?
  const dataCacheEntityRepositoryMock = {
    createQueryBuilder: (): any => ({
      where: (): any => ({
        orderBy: (): any => ({
          limit: (): any => ({
            getOne: (): Promise<DataCacheEntity> => Promise.resolve(dataCache),
          }),
        }),
      }),
    }),
  };
  // TODO: interface ?
  const dataSiteEntityRepositoryMock = {
    createQueryBuilder: (): any => ({
      orderBy: (): any => ({
        getMany: (): Promise<DataSiteEntity[]> => Promise.resolve([dataSite]),
      }),
    }),
  };
  const dataTransformServiceMock: DataTransformServiceInterface = {
    album: (): Promise<AlbumResDto> => Promise.resolve(album),
    artist: (): Promise<ArtistResDto> => Promise.resolve(artist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(elasticSearchRes),
  };

  let service: DataSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: getRepositoryToken(DataCacheEntity, DATA_TYPEORM),
          useValue: dataCacheEntityRepositoryMock,
        },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        {
          provide: getRepositoryToken(DataSiteEntity, DATA_TYPEORM),
          useValue: dataSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<DataSongService>(DataSongService);
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
    const dto: SongArtistSongsTopReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs 2", async () => {
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

  it("get should be equal to a songs", async () => {
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

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      orderBy: SongOrderByType.release,
      size: 0,
    };
    expect(await service.language(dto)).toEqual([song]);
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
    const dataCacheEntityRepositoryMock = {
      createQueryBuilder: (): any => ({
        where: (): any => ({
          orderBy: (): any => ({
            limit: (): any => ({
              getOne: () => Promise.resolve(undefined),
            }),
          }),
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: getRepositoryToken(DataCacheEntity, DATA_TYPEORM),
          useValue: dataCacheEntityRepositoryMock,
        },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        {
          provide: getRepositoryToken(DataSiteEntity, DATA_TYPEORM),
          useValue: dataSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<DataSongService>(DataSongService);

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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockGet,
        },
        {
          provide: getRepositoryToken(DataCacheEntity, DATA_TYPEORM),
          useValue: dataCacheEntityRepositoryMock,
        },
        {
          provide: getRepositoryToken(DataSiteEntity, DATA_TYPEORM),
          useValue: dataSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<DataSongService>(DataSongService);

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
});
