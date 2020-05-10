import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataTransformService } from "../data/data.transform.service";
import { DataTransformServiceInterface } from "../data/data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
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
  const searchArtist: DataSearchResDto = {
    artist,
    position: 1,
    type: DataSearchType.artist,
  };
  const searchSong: DataSearchResDto = {
    position: 1,
    song,
    type: DataSearchType.song,
  };
  const searchArtistPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [searchArtist],
    total: 1,
  } as DataPaginationResDto<DataSearchResDto>;
  const searchSongPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [searchSong],
    total: 1,
  } as DataPaginationResDto<DataSearchResDto>;
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    downloadCount: 0,
    name: "",
    releaseDate,
  };
  const searchAlbum: DataSearchResDto = {
    album,
    position: 1,
    type: DataSearchType.album,
  };
  const searchAlbumPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [searchAlbum],
    total: 1,
  } as DataPaginationResDto<DataSearchResDto>;
  // TODO: interface ?
  const _source = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [],
    copyright: false,
    downloads_count: 0,
    duration: 0,
    has_cover: false,
    has_video: false,
    id: 0,
    localize: false,
    lyrics: "",
    max_audio_rate: 0,
    release_date: releaseDate,
    tags: [{ tag: "" }],
    title: "",
    type: "",
    unique_name: "",
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

  const dataTransformServiceMock: DataTransformServiceInterface = {
    transformAlbum: (): DataAlbumResDto => album,
    transformArtist: (): DataArtistResDto => artist,
    transformSong: (): DataSongResDto => song,
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): Promise<any> => Promise.resolve(elasticSearchRes),
  };
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    elasticNode: "",
    elasticScriptScore: "",
    index: "",
    resultSize: 0,
    suggestIndex: "",
  };

  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SearchConfigService, useValue: searchConfigServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("query should be equal to an empty list", async () => {
    const dto: SearchQueryReqDto = {
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual({ results: [], total: 0 });
  });

  it("mood should be equal to a list of songs", async () => {
    const paramDto: SearchMoodParamDto = {
      from: 0,
      size: 0,
    };
    const queryDto: SearchMoodQueryDto = {
      date: 1,
    };
    expect(await service.mood(paramDto, queryDto)).toEqual(songPagination);
  });

  describe("type: artist", () => {
    // TODO: interface ?
    const elasticSearchArtistRes = {
      body: {
        hits: {
          hits: [
            {
              _source: {
                ..._source,
                type: DataSearchType.artist,
              },
            },
          ],
        },
      },
    };

    // TODO: interface ?
    const elasticsearchServiceMockArtist = {
      search: (): Promise<any> => Promise.resolve(elasticSearchArtistRes),
    };

    let service: SearchService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SearchService,
          { provide: DataTransformService, useValue: dataTransformServiceMock },
          {
            provide: ElasticsearchService,
            useValue: elasticsearchServiceMockArtist,
          },
          {
            provide: SearchConfigService,
            useValue: searchConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<SearchService>(SearchService);
    });

    it("query should be equal to a list of search results", async () => {
      const dto: SearchQueryReqDto = {
        from: 0,
        query: "",
        size: 0,
      };
      expect(await service.query(dto)).toEqual(searchArtistPagination);
    });
  });

  describe("type: album", () => {
    const elasticSearchAlbumRes = {
      body: {
        hits: {
          hits: [
            {
              _source: {
                ..._source,
                type: DataSearchType.album,
              },
            },
          ],
        },
      },
    };

    // TODO: interface ?
    const elasticsearchServiceMockAlbum = {
      search: (): Promise<any> => Promise.resolve(elasticSearchAlbumRes),
    };

    let service: SearchService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SearchService,
          { provide: DataTransformService, useValue: dataTransformServiceMock },
          {
            provide: ElasticsearchService,
            useValue: elasticsearchServiceMockAlbum,
          },
          {
            provide: SearchConfigService,
            useValue: searchConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<SearchService>(SearchService);
    });

    it("query should be equal to a list of search results 2", async () => {
      const dto: SearchQueryReqDto = {
        from: 0,
        query: "",
        size: 0,
      };
      expect(await service.query(dto)).toEqual(searchAlbumPagination);
    });
  });

  describe("type: song", () => {
    const elasticSearchSongRes = {
      body: {
        hits: {
          hits: [
            {
              _source: {
                ..._source,
                type: DataSearchType.song,
              },
            },
          ],
        },
      },
    };

    // TODO: interface ?
    const elasticsearchServiceMockSong = {
      search: (): Promise<any> => Promise.resolve(elasticSearchSongRes),
    };

    let service: SearchService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SearchService,
          { provide: DataTransformService, useValue: dataTransformServiceMock },
          {
            provide: ElasticsearchService,
            useValue: elasticsearchServiceMockSong,
          },
          {
            provide: SearchConfigService,
            useValue: searchConfigServiceMock,
          },
        ],
      }).compile();
      service = module.get<SearchService>(SearchService);
    });

    it("query should be equal to a list of search results 3", async () => {
      const dto: SearchQueryReqDto = {
        from: 0,
        query: "",
        size: 0,
      };
      expect(await service.query(dto)).toEqual(searchSongPagination);
    });
  });
});
