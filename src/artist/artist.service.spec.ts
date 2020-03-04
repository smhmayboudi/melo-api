import { Test, TestingModule } from "@nestjs/testing";
import { RelationEntityType } from "../relation/relation.entity.type";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { ArtistService } from "./artist.service";

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
  const appMixArtistServiceMock = {
    mixArtist: (): DataArtistResDto[] => [mixArtist]
  };
  const dataArtistServiceMock = {
    byId: (): DataArtistResDto => mixArtist,
    byIds: (): DataPaginationResDto<DataArtistResDto> => mixArtistPaginatin,
    trending: (): DataPaginationResDto<DataArtistResDto> => mixArtistPaginatin,
    trendingGenre: (): DataPaginationResDto<DataArtistResDto> =>
      mixArtistPaginatin
  };
  const relationServiceMock = {
    get: (): RelationPaginationResDto<RelationEntityResDto> =>
      ({
        results: [
          {
            id: "",
            type: RelationEntityType.album
          }
        ],
        total: 1
      } as RelationPaginationResDto<RelationEntityResDto>),
    remove: (): {} => ({}),
    set: (): {} => ({})
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
    const req = {
      id: ""
    };
    expect(await artistService.follow(req, 0, 0)).toEqual(mixArtist);
  });

  it("following should return list of artists", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    expect(await artistService.following(req, 0)).toEqual(mixArtistPaginatin);
  });

  it("profile should return an artist", async () => {
    const req = {
      id: ""
    };
    expect(await artistService.profile(req, 0, 0)).toEqual(mixArtist);
  });

  it("trending should return list of artists", async () => {
    expect(await artistService.trending(0)).toEqual(mixArtistPaginatin);
  });

  it("trendingGenre should return list of artists", async () => {
    const req = {
      genre: ""
    };
    expect(await artistService.trendingGenre(req, 0)).toEqual(
      mixArtistPaginatin
    );
  });

  it("unfollow should return an artist", async () => {
    const req = {
      id: ""
    };
    expect(await artistService.unfollow(req, 0, 0)).toEqual(mixArtist);
  });
});
