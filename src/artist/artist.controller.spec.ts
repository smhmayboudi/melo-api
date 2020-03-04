import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationPaginationResDto } from "../relation/dto/res/relation.pagination.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

describe("ArtistController", () => {
  const appHashIdServiceMock = {
    decode: (): string => "",
    encode: (): string => ""
  };
  const mixArtist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixArtistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [mixArtist],
    total: 1
  } as DataPaginationResDto<DataArtistResDto>;
  const appMixArtistServiceMock = {
    mixArtist: (): DataArtistResDto[] => [mixArtist]
  };
  const dataArtistServiceMock = {
    byId: (): DataArtistResDto => mixArtist,
    byIds: (): DataPaginationResDto<DataArtistResDto> => mixArtistPagination,
    trending: (): DataPaginationResDto<DataArtistResDto> => mixArtistPagination,
    trendingGenre: (): DataPaginationResDto<DataArtistResDto> =>
      mixArtistPagination
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

  let artistController: ArtistController;
  let artistService: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        ArtistService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: DataArtistService, useValue: dataArtistServiceMock },
        { provide: RelationService, useValue: relationServiceMock }
      ]
    }).compile();
    artistController = module.get<ArtistController>(ArtistController);
    artistService = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(artistController).toBeDefined();
  });

  it("follow should return an artist", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(artistService, "follow")
      .mockImplementation(() => Promise.resolve(mixArtist));
    expect(await artistController.follow(req, 0, 0)).toBe(mixArtist);
  });

  it("following should return list of artists", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    jest
      .spyOn(artistService, "following")
      .mockImplementation(() => Promise.resolve(mixArtistPagination));
    expect(await artistController.following(req, 0)).toBe(mixArtistPagination);
  });

  it("profile should return an artist", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(artistService, "profile")
      .mockImplementation(() => Promise.resolve(mixArtist));
    expect(await artistController.profile(req, 0, 0)).toBe(mixArtist);
  });

  it("trending should return list of artists", async () => {
    jest
      .spyOn(artistService, "trending")
      .mockImplementation(() => Promise.resolve(mixArtistPagination));
    expect(await artistController.trending(0)).toBe(mixArtistPagination);
  });

  it("trending/genre should return list of artists", async () => {
    const req = {
      genre: ""
    };
    jest
      .spyOn(artistService, "trendingGenre")
      .mockImplementation(() => Promise.resolve(mixArtistPagination));
    expect(await artistController.trendingGenre(req, 0)).toBe(
      mixArtistPagination
    );
  });

  it("unfollow should return an artist", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(artistService, "unfollow")
      .mockImplementation(() => Promise.resolve(mixArtist));
    expect(await artistController.unfollow(req, 0, 0)).toBe(mixArtist);
  });
});
