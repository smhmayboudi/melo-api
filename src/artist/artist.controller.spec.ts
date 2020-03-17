import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistController } from "./artist.controller";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistService } from "./artist.service";
import { ArtistServiceInterface } from "./artist.servcie.interface";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";

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

  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: ArtistService, useValue: artistServiceMock }
      ]
    }).compile();
    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: "0"
    };
    expect(await controller.follow(dto, 0, 0)).toEqual(mixArtist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.following(dto, 0)).toEqual(mixArtistPagination);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: "0"
    };
    expect(await controller.profile(dto, 0, 0)).toEqual(mixArtist);
  });

  it("trending should equal list of artists", async () => {
    expect(await controller.trending(0)).toEqual(mixArtistPagination);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop"
    };
    expect(await controller.trendingGenre(dto, 0)).toEqual(mixArtistPagination);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: "0"
    };
    expect(await controller.unfollow(dto, 0, 0)).toEqual(mixArtist);
  });
});
