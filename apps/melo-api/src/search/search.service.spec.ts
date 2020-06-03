import {
  AlbumResDto,
  ArtistResDto,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataSearchType,
  SearchConfigReqDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { DataTransformService } from "../data/data.transform.service";
import { DataTransformServiceInterface } from "../data/data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SearchService } from "./search.service";
import { Test } from "@nestjs/testing";

describe("SearchService", () => {
  const config: SearchConfigReqDto = {
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    suggestIndex: "",
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
  const releaseDate = new Date();
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

  const dataTransformServiceMock: DataTransformServiceInterface = {
    album: () => Promise.resolve(album),
    artist: () => Promise.resolve(artist),
    song: () => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: () => Promise.resolve(elasticGetRes),
    search: () => Promise.resolve(elasticSearchRes),
  };

  let service: SearchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("query should be equal to an empty list", async () => {
    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: DataSearchType.album,
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
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
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
                          type: DataSearchType.album,
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
                          type: DataSearchType.artist,
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
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: DataSearchType.album,
      },
      {
        artist,
        position: 2,
        type: DataSearchType.artist,
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
                    type: DataSearchType.album,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 1,
                    type: DataSearchType.artist,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 2,
                    type: DataSearchType.podcast,
                  },
                },
                {
                  _source: {
                    ...searchElastic,
                    id: 3,
                    type: DataSearchType.song,
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
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        {
          provide: ElasticsearchService,
          useValue: elasticsearchServiceMockSearch,
        },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);

    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      query: "",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([
      {
        album,
        position: 1,
        type: DataSearchType.album,
      },
      {
        artist,
        position: 2,
        type: DataSearchType.artist,
      },
      {
        position: 3,
        song,
        type: DataSearchType.podcast,
      },
      {
        position: 4,
        song,
        type: DataSearchType.song,
      },
    ]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SearchMoodReqDto = {
      config,
      dataConfigElasticsearch,
      date: 1,
      from: 0,
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs 2", async () => {
    const dto: SearchMoodReqDto = {
      config,
      dataConfigElasticsearch,
      date: undefined,
      from: 0,
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });
});
