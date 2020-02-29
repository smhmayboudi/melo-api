import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { AppModule } from "../app/app.module";
import config from "./artist.config";
import { ArtistService } from "./artist.service";

describe("ArtistService", () => {
  let artistService: ArtistService;

  const appMixArtistServiceMock = jest.fn(() => ({
    mixArtist: [{ followersCount: 0, id: "", type: DataArtistType.prime }]
  }));

  const dataArtistServiceMock = jest.fn(() => ({
    byId: {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    },
    byIds: {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    },
    trending: {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    },
    trendingGenre: {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    }
  }));

  const relationServiceMock = jest.fn(() => ({
    set: jest.fn(),
    get: {
      results: [],
      total: 0
    },
    remove: jest.fn()
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
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
    jest
      .spyOn(artistService, "follow")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.follow(req, 0, 0)).toBe(res);
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
      total: 0
    } as DataPaginationResDto<DataArtistResDto>;
    jest
      .spyOn(artistService, "following")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.following(req, 0)).toBe(res);
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
    jest
      .spyOn(artistService, "profile")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.profile(req, 0, 0)).toBe(res);
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
    jest
      .spyOn(artistService, "trending")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.trending(0)).toBe(res);
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
    jest
      .spyOn(artistService, "trendingGenre")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.trendingGenre(req, 0)).toBe(res);
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
    jest
      .spyOn(artistService, "unfollow")
      .mockImplementation(() => Promise.resolve(res));

    expect(await artistService.unfollow(req, 0, 0)).toBe(res);
  });
});
