import { DATA_TYPEORM, SITE_TYPEORM } from "../app/app.constant";
import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistType } from "./data.artist.type";
import { DataCacheEntity } from "./data.cache.entity";
import { DataConfigService } from "./data.config.service";
import { DataOrderByType } from "./data.order-by.type";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchType } from "./data.search.type";
import { DataSiteEntity } from "./data.site.entity";
import { DataSongAlbumReqDto } from "./dto/req/data.song.album.req.dto";
import { DataSongArtistSongsTopReqDto } from "./dto/req/data.song.artist-songs-top.req.dto";
import { DataSongArtistsReqDto } from "./dto/req/data.song.artists.req.dto";
import { DataSongByIdReqDto } from "./dto/req/data.song.by-id.req.dto";
import { DataSongByIdsReqDto } from "./dto/req/data.song.by-ids.req.dto";
import { DataSongGenreReqDto } from "./dto/req/data.song.genre.req.dto";
import { DataSongLanguageReqDto } from "./dto/req/data.song.language.req.dto";
import { DataSongMoodReqDto } from "./dto/req/data.song.mood.req.dto";
import { DataSongNewPodcastReqDto } from "./dto/req/data.song.new-podcast.req.dto";
import { DataSongNewReqDto } from "./dto/req/data.song.new.req.dto";
import { DataSongPodcastReqDto } from "./dto/req/data.song.podcast.req.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataSongService } from "./data.song.service";
import { DataSongSimilarReqDto } from "./dto/req/data.song.similar.req.dto";
import { DataSongTopDayReqDto } from "./dto/req/data.song.top-day.req.dto";
import { DataSongTopWeekReqDto } from "./dto/req/data.song.top-week.req.dto";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("DataSongService", () => {
  const releaseDate = new Date();
  const song: DataSongResDto = {
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const album: DataAlbumResDto = {
    downloadCount: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const dataCacheEntity: DataCacheEntity = {
    date: releaseDate,
    id: 0,
    name: "",
    result: `[{ "id": 0, "type": "${DataSearchType.song}" }]`,
  };
  const dataSiteEntity: DataSiteEntity = {
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
            getOne: (): Promise<DataCacheEntity> =>
              Promise.resolve(dataCacheEntity),
          }),
        }),
      }),
    }),
  };
  // TODO: interface ?
  const dataSiteEntityRepositoryMock = {
    createQueryBuilder: (): any => ({
      orderBy: (): any => ({
        getMany: (): Promise<DataSiteEntity[]> =>
          Promise.resolve([dataSiteEntity]),
      }),
    }),
  };
  const dataTransformServiceMock: DataTransformServiceInterface = {
    transformAlbum: (): DataAlbumResDto => album,
    transformArtist: (): DataArtistResDto => artist,
    transformSong: (): DataSongResDto => song,
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
        { provide: DataConfigService, useValue: {} },
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: getRepositoryToken(DataCacheEntity, DATA_TYPEORM),
          useValue: dataCacheEntityRepositoryMock,
        },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        {
          provide: getRepositoryToken(DataSiteEntity, SITE_TYPEORM),
          useValue: dataSiteEntityRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<DataSongService>(DataSongService);
  });

  it("albumSongs should be equal to a list of songs", async () => {
    const dto: DataSongAlbumReqDto = {
      id: 0,
    };
    expect(await service.albumSongs(dto)).toEqual(songPagination);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: DataSongArtistsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongs(dto)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: DataSongArtistSongsTopReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual(songPagination);
  });

  it("byId should be equal to a songs", async () => {
    const dto: DataSongByIdReqDto = {
      id: 0,
    };
    expect(await service.byId(dto)).toEqual(song);
  });

  it("byIds should be equal to a list of songs", async () => {
    const dto: DataSongByIdsReqDto = {
      ids: [],
    };
    expect(await service.byIds(dto)).toEqual(songPagination);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: DataSongGenreReqDto = {
      from: 0,
      genres: [],
      orderBy: DataOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual(songPagination);
  });

  it("genre should be equal to a list of songs, genre all", async () => {
    const dto: DataSongGenreReqDto = {
      from: 0,
      genres: ["all"],
      orderBy: DataOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: DataSongLanguageReqDto = {
      from: 0,
      language: "",
      orderBy: DataOrderByType.downloads,
      size: 0,
    };
    expect(await service.language(dto)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: DataSongMoodReqDto = {
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await service.mood(dto)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: DataSongNewPodcastReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual(songPagination);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: DataSongNewReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: DataSongPodcastReqDto = {
      from: 0,
      genres: [],
      orderBy: DataOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs genres all", async () => {
    const dto: DataSongPodcastReqDto = {
      from: 0,
      genres: ["all"],
      orderBy: DataOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: DataSongSimilarReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    expect(await service.slider()).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: DataSongTopDayReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.topDay(dto)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: DataSongTopWeekReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.topWeek(dto)).toEqual(songPagination);
  });
});
