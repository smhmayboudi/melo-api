/* eslint-disable @typescript-eslint/unbound-method */
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumHashIdInterceptor } from "./album.hash-id.interceptor";
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
import { of } from "rxjs";

describe("AlbumHashIdInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ params: { id: 0 } })),
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
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(album)),
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

  const appEncodingServiceMock: AppEncodingServiceInterface = {
    encodeAlbums: (): DataAlbumResDto[] => [album],
    encodeArtists: (): DataArtistResDto[] => [artist],
    encodePlaylists: (): DataPlaylistResDto[] => [playlist],
    encodeSearches: (): DataSearchResDto[] => [search],
    encodeSongs: (): DataSongResDto[] => [song],
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
      new AlbumHashIdInterceptor(encodingService, hashIdService)
    ).toBeDefined();
  });

  it("intercept should be called", () => {
    new AlbumHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single album", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(album)),
    };
    new AlbumHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of albums", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(albumPagination)),
    };
    new AlbumHashIdInterceptor(encodingService, hashIdService)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
