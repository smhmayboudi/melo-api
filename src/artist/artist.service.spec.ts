import { Test, TestingModule } from "@nestjs/testing";

import { AppArtist } from "../app/app.artist";
import { AppArtistInterface } from "../app/app.artist.interface";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
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
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";

describe("ArtistService", () => {
  const follow: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const followPaginatin: DataPaginationResDto<DataArtistResDto> = {
    results: [follow],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;

  const dataArtistServiceMock: DataArtistServiceInterface = {
    byId: (): Promise<DataArtistResDto> => Promise.resolve(follow),
    byIds: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPaginatin),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPaginatin),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPaginatin),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: 0,
            type: RelationEntityType.album,
          },
        ],
        total: 1,
      } as RelationPaginationResDto<RelationEntityResDto>),
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
  const appArtistMock: AppArtistInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([follow]),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppArtist, useValue: appArtistMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await service.follow(dto)).toEqual({
      ...follow,
      followersCount: 1,
      following: true,
    });
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0,
      sub: 0,
    };
    expect(await service.following(dto)).toEqual(followPaginatin);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(follow);
  });

  it("trending should equal list of artists", async () => {
    expect(await service.trending()).toEqual(followPaginatin);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "",
    };
    expect(await service.trendingGenre(dto)).toEqual(followPaginatin);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await service.unfollow(dto)).toEqual(follow);
  });

  describe("ArtistService", () => {
    const relationServiceMockEmptyGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
        Promise.resolve({
          results: [] as RelationEntityResDto[],
          total: 0,
        } as RelationPaginationResDto<RelationEntityResDto>),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ArtistService,
          { provide: AppArtist, useValue: appArtistMock },
          { provide: DataArtistService, useValue: dataArtistServiceMock },
          { provide: RelationService, useValue: relationServiceMockEmptyGet },
        ],
      }).compile();
      service = module.get<ArtistService>(ArtistService);
    });

    it("following should equal an empty list", async () => {
      const dto: ArtistFollowingReqDto = {
        from: 0,
        limit: 0,
        sub: 0,
      };
      expect(await service.following(dto)).toEqual({
        results: [],
        total: 0,
      });
    });
  });
});
