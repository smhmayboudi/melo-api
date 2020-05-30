import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataSearchType,
  SearchConfigReqDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataTransformService } from "../data/data.transform.service";
import { DataTransformServiceInterface } from "../data/data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SearchService } from "./search.service";

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
  const album: AlbumResDto = {
    downloadCount: 0,
    name: "",
    releaseDate,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
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
    album: (): Promise<AlbumResDto> => Promise.resolve(album),
    artist: (): Promise<ArtistResDto> => Promise.resolve(artist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): Promise<any> => Promise.resolve(elasticSearchRes),
  };

  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    const elasticsearchServiceMock = {
      search: (): Promise<any> =>
        Promise.resolve({
          body: {
            hits: {
              hits: [],
            },
          },
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
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
    const elasticsearchServiceMock = {
      search: (query: any): Promise<any> =>
        Promise.resolve(
          query.body.from === undefined
            ? {
                body: {
                  hits: {
                    hits: [
                      {
                        _source: {
                          ..._source,
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
                          ..._source,
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
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
    const elasticsearchServiceMock = {
      search: (): Promise<any> =>
        Promise.resolve({
          body: {
            hits: {
              hits: [
                {
                  _source: {
                    ..._source,
                    id: 0,
                    type: DataSearchType.album,
                  },
                },
                {
                  _source: {
                    ..._source,
                    id: 1,
                    type: DataSearchType.artist,
                  },
                },
                {
                  _source: {
                    ..._source,
                    id: 2,
                    type: DataSearchType.podcast,
                  },
                },
                {
                  _source: {
                    ..._source,
                    id: 3,
                    type: DataSearchType.song,
                  },
                },
              ],
            },
          },
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
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
