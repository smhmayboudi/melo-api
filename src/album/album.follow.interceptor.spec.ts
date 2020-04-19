import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumFollowInterceptor } from "./album.follow.interceptor";
import { AppArtist } from "../app/app.artist";
import { AppArtistInterface } from "../app/app.artist.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("AlbumFollowInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "1" } })),
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
  const callHandler: CallHandler = {
    handle: jest.fn(() => of("")),
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const appArtistMock: AppArtistInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };

  let service: AppArtist;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppArtist, useValue: appArtistMock }],
    }).compile();
    service = module.get<AppArtist>(AppArtist);
  });

  it("should be defined", () => {
    expect(new AlbumFollowInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called sub: 0", () => {
    const httpArgumentsHostUserSubZero: HttpArgumentsHost = {
      ...httpArgumentsHost,
      getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single album", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(album)),
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of albums", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(albumPagination)),
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
