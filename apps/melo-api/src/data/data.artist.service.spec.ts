import {
  AlbumResDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataArtistService } from "./data.artist.service";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";

describe("DataArtistService", () => {
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
  const album: AlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<ArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<ArtistResDto>;
  // TODO: interface ?
  const elasticArtistRes = {
    body: {
      hits: {
        hits: [
          {
            _source: {
              artist_followers_count: 0,
              artist_full_name: "",
              artist_id: 0,
              artist_local_full_name: "",
              artist_sum_downloads_count: 0,
              artists: [
                {
                  available: false,
                  followers_count: 0,
                  full_name: "",
                  has_cover: false,
                  id: 0,
                  popular: false,
                  sum_downloads_count: 0,
                  type: "prime",
                  weight: 0,
                },
              ],
              artists_ids: [0],
              available: false,
              has_cover: false,
              id: 0,
              type: DataSearchType.artist,
              weight: 0,
            },
          },
        ],
      },
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

  const dataTransformServiceMock: DataTransformServiceInterface = {
    album: (): Promise<AlbumResDto> => Promise.resolve(album),
    artist: (): Promise<ArtistResDto> => Promise.resolve(artist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): Promise<any> => Promise.resolve(elasticArtistRes),
  };

  let service: DataArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataArtistService,
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
      ],
    }).compile();
    service = module.get<DataArtistService>(DataArtistService);
  });

  it("get should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(artist);
  });

  it("getByIds should equal list of artists", async () => {
    const dto: ArtistGetByIdsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      ids: [0],
    };
    expect(await service.getByIds(dto)).toEqual(artistPagination);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await service.trending(dto)).toEqual(artistPagination);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual(artistPagination);
  });
});
