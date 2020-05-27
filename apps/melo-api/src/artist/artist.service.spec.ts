import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  RelationEntityReqDto,
  RelationEntityType,
  RelationMultiHasResDto,
  RelationType,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { ArtistService } from "./artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistServiceInterface } from "../data/data.artist.service.interface";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";

describe("ArtistService", () => {
  const config: ArtistConfigReqDto = {
    maxSize: 0,
  };
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
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<ArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<ArtistResDto>;

  const appArtistMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataArtistServiceMock: DataArtistServiceInterface = {
    get: (): Promise<ArtistResDto> => Promise.resolve(artist),
    getByIds: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    trending: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    trendingGenre: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<DataPaginationResDto<RelationEntityReqDto>> =>
      Promise.resolve({
        results: [
          {
            id: 0,
            type: RelationEntityType.album,
          },
        ],
        total: 1,
      } as DataPaginationResDto<RelationEntityReqDto>),
    has: (): Promise<boolean> => Promise.resolve(true),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: 0,
            type: RelationEntityType.album,
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: 1,
            type: RelationEntityType.album,
          },
        },
      ]),
    remove: (): Promise<boolean> => Promise.resolve(true),
    set: (): Promise<boolean> => Promise.resolve(true),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtistService, useValue: appArtistMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follows should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.follow(dto)).toEqual({
      ...artist,
      followersCount: 1,
      following: true,
    });
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual(artistPagination);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
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

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unfollow(dto)).toEqual(artist);
  });

  it("following should equal an empty list", async () => {
    const relationServiceMockGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<DataPaginationResDto<RelationEntityReqDto>> =>
        Promise.resolve({
          results: [] as RelationEntityReqDto[],
          total: 0,
        } as DataPaginationResDto<RelationEntityReqDto>),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtistService, useValue: appArtistMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMockGet },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);

    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual({
      results: [],
      total: 0,
    });
  });
});
