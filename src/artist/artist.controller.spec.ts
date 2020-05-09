import { Test, TestingModule } from "@nestjs/testing";

import { AppArtistServceInterface } from "../app/app.artist.service.interface";
import { AppArtistService } from "../app/app.artist.service";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistController } from "./artist.controller";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistService } from "./artist.service";
import { ArtistServiceInterface } from "./artist.servcie.interface";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("ArtistController", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
  };
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0,
  };
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };
  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<DataSongResDto> => Promise.resolve(song),
    likes: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto => song,
  };
  const appArtistMock: AppArtistServceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };
  const artistServiceMock: ArtistServiceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    following: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPagination),
    profile: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    trending: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPagination),
    trendingGenre: (): Promise<DataPaginationResDto<DataArtistResDto>> =>
      Promise.resolve(artistPagination),
    unfollow: (): Promise<DataArtistResDto> => Promise.resolve(artist),
  };

  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: ArtistService, useValue: artistServiceMock },
        { provide: AppSongService, useValue: appSongMock },
        { provide: AppArtistService, useValue: appArtistMock },
      ],
    }).compile();
    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("follows should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await controller.follow(dto, 0)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 0,
    };
    expect(await controller.following(dto, 0)).toEqual(artistPagination);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistByIdReqDto = {
      id: 0,
    };
    expect(await controller.profile(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    expect(await controller.trending()).toEqual(artistPagination);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop",
    };
    expect(await controller.trendingGenre(dto)).toEqual(artistPagination);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await controller.unfollow(dto, 0)).toEqual(artist);
  });
});
