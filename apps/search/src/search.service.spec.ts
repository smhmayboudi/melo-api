import {
  ALBUM_SERVICE,
  ARTIST_SERVICE,
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  SONG_SERVICE,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchType,
  SongResDto,
} from "@melo/common";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchService } from "./search.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("SearchService", () => {
  const releaseDate = new Date();
  const artistElastic: SearchElasticsearchArtistResDto = {
    available: false,
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
    type: ArtistType.prime,
  };
  const searchElastic: SearchElasticsearchSearchResDto = {
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
    type: SearchType.album,
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
  const album: AlbumResDto = {
    downloadCount: 0,
    name: "",
    releaseDate,
  };
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };
  const song: SongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: ArtistType.prime,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
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
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(elasticSearchRes),
  };
  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of(song),
  };
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
    suggestIndex: "",
  };

  let service: SearchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
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
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: SearchType.album,
      },
    ]);
  });

  it("query should be equal to an empty list 2", async () => {
    // TODO: interface ?
    const elasticsearchServiceMockSearch = {
      ...elasticsearchServiceMock,
      search: () =>
        Promise.resolve({
          body: {
            hits: {
              hits: [],
            },
          },
        }),
    };

    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        { provide: SearchConfigService, useValue: searchConfigServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([]);
  });

  it("query should be equal to an empty list 3", async () => {
    // TODO: interface ?
    const elasticsearchServiceMockSearch = {
      ...elasticsearchServiceMock,
      search: (query: any): Promise<any> =>
        Promise.resolve(
          query.body.from === undefined
            ? {
                body: {
                  hits: {
                    hits: [
                      {
                        _source: {
                          ...searchElastic,
                          id: 0,
                          type: SearchType.album,
                        },
                      },
                    ],
                  },
                },
              }
            : {
                body: {
                  hits: {
                    hits: [
                      {
                        _source: {
                          ...searchElastic,
                          id: 1,
                          type: SearchType.artist,
                        },
                      },
                    ],
                  },
                },
              }
        ),
    };

    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        { provide: SearchConfigService, useValue: searchConfigServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: SearchType.album,
      },
      {
        artist,
        position: 2,
        type: SearchType.artist,
      },
    ]);
  });

  it("query should be equal to an empty list 4", async () => {
    // TODO: interface ?
    const elasticsearchServiceMockSearch = {
      ...elasticsearchServiceMock,
      search: () =>
        Promise.resolve({
          body: {
            hits: {
              hits: [
                {
                  _source: {
                    ...searchElastic,
                    id: 0,
                    type: SearchType.album,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 1,
                    type: SearchType.artist,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 2,
                    type: SearchType.podcast,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 3,
                    type: SearchType.song,
                  },
                },
              ],
            },
          },
        }),
    };

    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        { provide: SearchConfigService, useValue: searchConfigServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: SearchType.album,
      },
      {
        artist,
        position: 2,
        type: SearchType.artist,
      },
      {
        position: 3,
        song,
        type: SearchType.podcast,
      },
      {
        position: 4,
        song,
        type: SearchType.song,
      },
    ]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SearchMoodReqDto = {
      date: 1,
      from: 0,
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs 2", async () => {
    const dto: SearchMoodReqDto = {
      date: undefined,
      from: 0,
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });
});
