import {
  AlbumResDto,
  ArtistResDto,
  DATA_TYPEORM,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
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
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    name: "",
    releaseDate,
    songs: songPagination,
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
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.albumSongs(dto)).toEqual(songPagination);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistsReqDto = {
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

  it("genre should be equal to a list of songs, genre all", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual(songPagination);
  });

  it("get should be equal to a songs", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
  });

  it("getByIds should be equal to a list of songs", async () => {
    const dto: SongGetByIdsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      ids: [],
    };
    expect(await service.getByIds(dto)).toEqual(songPagination);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: [],
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
    const dto: SongPodcastReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs genres all", async () => {
    const dto: SongPodcastReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
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
});
