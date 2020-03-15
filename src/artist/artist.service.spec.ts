import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixArtistServiceInterface } from "../app/app.mix-artist.service.interface";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistServiceInterface } from "../data/data.artist.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "../relation/dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { RelationType } from "../relation/relation.type";
import { ArtistService } from "./artist.service";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

describe("ArtistService", () => {
  const mixArtist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixArtistPaginatin: DataPaginationResDto<DataArtistResDto> = {
    results: [mixArtist],
    total: 1
  } as DataPaginationResDto<DataArtistResDto>;

  const dataArtistServiceMock: DataArtistServiceInterface = {
    byId: (): Promise<DataArtistResDto> => Promise.resolve(mixArtist),
    byIds: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPaginatin),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPaginatin),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPaginatin)
  };
  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
      Promise.resolve({
        results: [
          {
            id: "",
            type: RelationEntityType.album
          }
        ],
        total: 1
      } as RelationPaginationResDto<RelationEntityResDto>),
    has: (): Promise<void> => Promise.resolve(undefined),
    multiHas: (): Promise<RelationMultiHasResDto[]> =>
      Promise.resolve([
        {
          from: {
            id: "0",
            type: RelationEntityType.album
          },
          relation: RelationType.dislikedSongs,
          to: {
            id: "1",
            type: RelationEntityType.album
          }
        }
      ]),
    remove: (): Promise<void> => Promise.resolve(undefined),
    set: (): Promise<void> => Promise.resolve(undefined)
  };
  const appMixArtistServiceMock: AppMixArtistServiceInterface = {
    mixArtist: (): Promise<DataArtistResDto[]> => Promise.resolve([mixArtist])
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock }
      ]
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: ""
    };
    expect(await service.follow(dto, 0, 0)).toEqual(mixArtist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.following(dto, 0)).toEqual(mixArtistPaginatin);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: ""
    };
    expect(await service.profile(dto, 0, 0)).toEqual(mixArtist);
  });

  it("trending should equal list of artists", async () => {
    expect(await service.trending(0)).toEqual(mixArtistPaginatin);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: ""
    };
    expect(await service.trendingGenre(dto, 0)).toEqual(mixArtistPaginatin);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: ""
    };
    expect(await service.unfollow(dto, 0, 0)).toEqual(mixArtist);
  });

  describe("ArtistService", () => {
    const relationServiceMockEmptyGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: (): Promise<RelationPaginationResDto<RelationEntityResDto>> =>
        Promise.resolve({
          results: [] as RelationEntityResDto[],
          total: 0
        } as RelationPaginationResDto<RelationEntityResDto>)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ArtistService,
          { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
          { provide: DataArtistService, useValue: dataArtistServiceMock },
          { provide: RelationService, useValue: relationServiceMockEmptyGet }
        ]
      }).compile();
      service = module.get<ArtistService>(ArtistService);
    });

    it("following should equal an empty list", async () => {
      const dto: ArtistFollowingReqDto = {
        from: 0,
        limit: 0
      };
      expect(await service.following(dto, 0)).toEqual({
        results: [],
        total: 0
      });
    });
  });
});
