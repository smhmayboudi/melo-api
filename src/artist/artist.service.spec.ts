import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  let artistService: ArtistService;

  const appMixArtistServiceMock = {
    mixArtist: (): any => [
      { followersCount: 0, id: "", type: DataArtistType.prime }
    ]
  };

  const dataArtistServiceMock = {
    byId: (): any => ({
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    }),
    byIds: (): any => ({
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    }),
    trending: (): any => ({
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    }),
    trendingGenre: (): any => ({
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    })
  };

  const relationServiceMock = {
    set: (): any => ({}),
    get: (): any => ({
      results: [],
      total: 0
    }),
    remove: (): any => ({})
  };
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
    const res = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    expect(await artistService.follow(req, 0, 0)).toEqual(res);
  });

  it("following should return list of artists", async () => {
    const req = {
      from: 0,
      limit: 0
    };
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    expect(await artistService.following(req, 0)).toEqual(res);
  });

  it("profile should return an artist", async () => {
    const req = {
      id: ""
    };
    const res = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    expect(await artistService.profile(req, 0, 0)).toEqual(res);
  });

  it("trending should return list of artists", async () => {
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    expect(await artistService.trending(0)).toEqual(res);
  });

  it("trendingGenre should return list of artists", async () => {
    const req = {
      genre: ""
    };
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    expect(await artistService.trendingGenre(req, 0)).toEqual(res);
  });

  it("unfollow should return an artist", async () => {
    const req = {
      id: ""
    };
    const res = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    expect(await artistService.unfollow(req, 0, 0)).toEqual(res);
  });
});
