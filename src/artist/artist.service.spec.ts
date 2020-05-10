import { Test, TestingModule } from "@nestjs/testing";

import { AppArtistServceInterface } from "../app/app.artist.service.interface";
import { AppArtistService } from "../app/app.artist.service";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistConfigService } from "./artist.config.service";
import { ArtistConfigServiceInterface } from "./artist.config.service.interface";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistService } from "./artist.service";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistServiceInterface } from "../data/data.artist.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";

describe("ArtistService", () => {
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPaginatin: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;

  const artistConfigServiceMock: ArtistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    resultSize: 0,
  };
  const dataArtistServiceMock: DataArtistServiceInterface = {
    byId: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    byIds: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPaginatin),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPaginatin),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPaginatin),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<DataPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: 0,
            type: RelationEntityType.album,
          },
        ],
        total: 1,
      } as DataPaginationResDto<RelationEntityResDto>),
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
  const appArtistMock: AppArtistServceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtistService, useValue: appArtistMock },
        { provide: ArtistConfigService, useValue: artistConfigServiceMock },
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
      id: 0,
      sub: 0,
    };
    expect(await service.follow(dto)).toEqual({
      ...artist,
      followersCount: 1,
      following: true,
    });
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 0,
    };
    expect(await service.following(dto)).toEqual(artistPaginatin);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    expect(await service.trending()).toEqual(artistPaginatin);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual(artistPaginatin);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await service.unfollow(dto)).toEqual(artist);
  });

  describe("ArtistService", () => {
    const relationServiceMockEmptyGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<DataPaginationResDto<RelationEntityResDto>> =>
        Promise.resolve({
          results: [] as RelationEntityResDto[],
          total: 0,
        } as DataPaginationResDto<RelationEntityResDto>),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ArtistService,
          { provide: AppArtistService, useValue: appArtistMock },
          { provide: ArtistConfigService, useValue: artistConfigServiceMock },
          { provide: DataArtistService, useValue: dataArtistServiceMock },
          { provide: RelationService, useValue: relationServiceMockEmptyGet },
        ],
      }).compile();
      service = module.get<ArtistService>(ArtistService);
    });

    it("following should equal an empty list", async () => {
      const dto: ArtistFollowingReqDto = {
        from: 0,
        size: 0,
        sub: 0,
      };
      expect(await service.following(dto)).toEqual({
        results: [],
        total: 0,
      });
    });
  });
});
