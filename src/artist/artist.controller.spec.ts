import { Test, TestingModule } from "@nestjs/testing";

import { AppCheckFollowService } from "../app/app.check-follow.service";
import { AppCheckFollowServiceInterface } from "../app/app.check-follow.service.interface";
import { AppCheckLikeService } from "../app/app.check-like.service";
import { AppCheckLikeServiceInterface } from "../app/app.check-like.service.interface";
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
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("ArtistController", () => {
  const releaseDate = new Date();
  const follow: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime,
  };
  const followPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [follow],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: "",
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };
  const appMixSongServiceMock: AppCheckLikeServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
  };
  const appMixArtistServiceMock: AppCheckFollowServiceInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([follow]),
  };
  const artistServiceMock: ArtistServiceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(follow),
    following: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPagination),
    profile: (): Promise<DataArtistResDto> => Promise.resolve(follow),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPagination),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(followPagination),
    unfollow: (): Promise<DataArtistResDto> => Promise.resolve(follow),
  };

  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: AppCheckLikeService, useValue: appMixSongServiceMock },
        { provide: AppCheckFollowService, useValue: appMixArtistServiceMock },
      ],
    }).compile();
    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: "0",
    };
    expect(await controller.follow(dto, 0, 0)).toEqual(follow);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      limit: 0,
    };
    expect(await controller.following(dto, 0)).toEqual(followPagination);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: "0",
    };
    expect(await controller.profile(dto, 0)).toEqual(follow);
  });

  it("trending should equal list of artists", async () => {
    expect(await controller.trending()).toEqual(followPagination);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop",
    };
    expect(await controller.trendingGenre(dto)).toEqual(followPagination);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: "0",
    };
    expect(await controller.unfollow(dto, 0, 0)).toEqual(follow);
  });
});
