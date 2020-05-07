import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistService } from "./data.artist.service";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSearchType } from "./data.search.type";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";

describe("DataArtistService", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;
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

  const dataConfigServiceMock: DataConfigServiceInterface = {
    defaultAlbumImagePath: "",
    defaultArtistImagePath: "",
    defaultSongImagePath: "",
    elasticNode: "",
    imagePath: () => "",
    index: "",
    mp3Endpoint: "",
    requestLimit: 0,
  };
  const dataTransformServiceMock: DataTransformServiceInterface = {
    transformAlbum: (): DataAlbumResDto => album,
    transformArtist: (): DataArtistResDto => artist,
    transformSong: (): DataSongResDto => song,
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
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
      ],
    }).compile();
    service = module.get<DataArtistService>(DataArtistService);
  });

  it("byIds should equal list of artists", async () => {
    const dto: DataArtistByIdsReqDto = {
      ids: [0],
    };
    expect(await service.byIds(dto)).toEqual(artistPagination);
  });

  it("trending should equal list of artists", async () => {
    expect(await service.trending()).toEqual(artistPagination);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: DataTrendingGenreReqDto = {
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual(artistPagination);
  });

  it("byId should be equal to an artist", async () => {
    const dto: DataArtistByIdReqDto = {
      id: 0,
    };
    expect(await service.byId(dto)).toEqual(artist);
  });
});
