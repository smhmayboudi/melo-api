import {
  AlbumResDto,
  ArtistResDto,
  DATA_TYPEORM,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataImageResDto,
  DataSearchType,
  PlaylistResDto,
  SongAlbumReqDto,
  SongArtistSongsTopReqDto,
  SongArtistsReqDto,
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
import { DataTransformServiceInterface } from "./data.transform.service.interface";
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
  const image: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
    },
  };
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
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "000000000000000000000000",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    name: "",
    releaseDate,
    songs: [song],
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
  const _source = {
    album: "",
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artists: [
      {
        available: false,
        followers_count: 0,
        full_name: "",
        has_cover: false,
        id: 0,
        popular: false,
        sum_downloads_count: 0,
        type: DataArtistType,
      },
    ],
    duration: 0,
    max_audio_rate: 0,
    release_date: releaseDate,
  };
  // TODO: interface ?
  const elasticSearchRes = {
    body: {
      hits: {
        hits: [
          {
            _source,
          },
        ],
      },
    },
  };
  // TODO: interface ?
  const elasticGetRes = {
    body: {
      _source: {
        ..._source,
        moods: {
          classy: 0,
        },
      },
    },
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
    playlist: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: (): Promise<any> => Promise.resolve(elasticGetRes),
    search: (): Promise<any> => Promise.resolve(elasticSearchRes),
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
    const dto: SongAlbumReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.albumSongs(dto)).toEqual([song]);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistsReqDto = {
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
              getOne: (): Promise<any> => Promise.resolve(undefined),
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
        _source,
      },
    };
    // TODO: interface ?
    const elasticsearchServiceMock = {
      get: (): Promise<any> => Promise.resolve(elasticGetRes),
      search: (): Promise<any> => Promise.resolve(elasticSearchRes),
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
