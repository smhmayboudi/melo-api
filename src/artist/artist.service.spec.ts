import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
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

  const dataArtistServiceMock = {
    byId: (): DataArtistResDto => mixArtist,
    byIds: (): DataPaginationResDto<DataArtistResDto> => mixArtistPaginatin,
    trending: (): DataPaginationResDto<DataArtistResDto> => mixArtistPaginatin,
    trendingGenre: (): DataPaginationResDto<DataArtistResDto> =>
      mixArtistPaginatin
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
  const appMixArtistServiceMock = {
    mixArtist: (): DataArtistResDto[] => [mixArtist]
  };

  let artistService: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock }
      ]
    }).compile();
    artistService = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(artistService).toBeDefined();
  });

  it("follow should return an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: ""
    };
    expect(await artistService.follow(dto, 0, 0)).toEqual(mixArtist);
  });

  it("following should return list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0
    };
    expect(await artistService.following(dto, 0)).toEqual(mixArtistPaginatin);
  });

  it("profile should return an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: ""
    };
    expect(await artistService.profile(dto, 0, 0)).toEqual(mixArtist);
  });

  it("trending should return list of artists", async () => {
    expect(await artistService.trending(0)).toEqual(mixArtistPaginatin);
  });

  it("trendingGenre should return list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: ""
    };
    expect(await artistService.trendingGenre(dto, 0)).toEqual(
      mixArtistPaginatin
    );
  });

  it("unfollow should return an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: ""
    };
    expect(await artistService.unfollow(dto, 0, 0)).toEqual(mixArtist);
  });
});
