import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { ArtistController } from "./artist.controller";
import { ArtistServiceInterface } from "./artist.servcie.interface";
import { ArtistService } from "./artist.service";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

describe("ArtistController", () => {
  const mixArtist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixArtistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [mixArtist],
    total: 1
  } as DataPaginationResDto<DataArtistResDto>;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };
  const artistServiceMock: ArtistServiceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(mixArtist),
    following: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPagination),
    profile: (): Promise<DataArtistResDto> => Promise.resolve(mixArtist),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPagination),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(mixArtistPagination),
    unfollow: (): Promise<DataArtistResDto> => Promise.resolve(mixArtist)
  };

  let artistController: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: ArtistService, useValue: artistServiceMock }
      ]
    }).compile();
    artistController = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(artistController).toBeDefined();
  });

  it("follow should return an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: "0"
    };
    expect(await artistController.follow(dto, 0, 0)).toBe(mixArtist);
  });

  it("following should return list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0
    };
    expect(await artistController.following(dto, 0)).toBe(mixArtistPagination);
  });

  it("profile should return an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: "0"
    };
    expect(await artistController.profile(dto, 0, 0)).toBe(mixArtist);
  });

  it("trending should return list of artists", async () => {
    expect(await artistController.trending(0)).toBe(mixArtistPagination);
  });

  it("trending/genre should return list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop"
    };
    expect(await artistController.trendingGenre(dto, 0)).toBe(
      mixArtistPagination
    );
  });

  it("unfollow should return an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: "0"
    };
    expect(await artistController.unfollow(dto, 0, 0)).toBe(mixArtist);
  });
});
