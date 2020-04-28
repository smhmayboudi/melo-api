/* eslint-disable @typescript-eslint/unbound-method */
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { PlaylistHashIdInterceptor } from "./playlist.hash-id.interceptor";
import { of } from "rxjs";

describe("PlaylistHashIdInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      body: { songId: 0 },
      params: { songId: 0 },
    })),
    getResponse: jest.fn().mockImplementation(() => ({ statusCode: 200 })),
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const song: DataSongResDto = {
    album: {
      artists: [artist],
      id: 0,
      name: "",
      releaseDate,
    },
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: songPagination,
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
  const playlistPagination: DataPaginationResDto<DataPlaylistResDto> = {
    results: [playlist],
    total: 1,
  } as DataPaginationResDto<DataPlaylistResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(playlist)),
  };
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };

  const appEncodingServiceMock: AppEncodingServiceInterface = {
    album: (): DataAlbumResDto[] => [album],
    artist: (): DataArtistResDto[] => [artist],
    playlist: (): DataPlaylistResDto[] => [playlist],
    search: (): DataSearchResDto[] => [search],
    song: (): DataSongResDto[] => [song],
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };

  let hashIdService: AppHashIdService;
  let encodingService: AppEncodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    hashIdService = module.get<AppHashIdService>(AppHashIdService);
    encodingService = module.get<AppEncodingService>(AppEncodingService);
  });

  it("should be defined", () => {
    expect(
      new PlaylistHashIdInterceptor(encodingService, hashIdService)
    ).toBeDefined();
  });

  it("intercept should be called", () => {
    new PlaylistHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single playlist", () => {
    new PlaylistHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of playlist", () => {
    const callHandlerPlaylist: CallHandler = {
      handle: jest.fn(() => of(playlistPagination)),
    };
    new PlaylistHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandlerPlaylist)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
