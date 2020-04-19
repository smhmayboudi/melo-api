import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSong } from "../app/app.song";
import { AppSongInterface } from "../app/app.song.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { SongLikeInterceptor } from "./song.like.interceptor";
import { of } from "rxjs";

describe("SongLikeInterceptor", () => {
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

  const appSongMock: AppSongInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto[] => [song],
  };

  let service: AppSong;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppSong, useValue: appSongMock }],
    }).compile();
    service = module.get<AppSong>(AppSong);
  });

  it("should be defined", () => {
    expect(new SongLikeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new SongLikeInterceptor(service)
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
    new SongLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single song", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(song)),
    };
    new SongLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: undefined", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(undefined)),
    };
    new SongLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of songs", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(songPagination)),
    };
    new SongLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
