/* eslint-disable @typescript-eslint/unbound-method */

import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { SongLocalizeInterceptor } from "./song.localize.interceptor";
import { of } from "rxjs";

describe("SongLocalizeInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } })),
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
  const songLocalized: DataSongResDto = {
    ...song,
    localized: true,
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(song)),
  };

  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto[] => [song],
  };

  let service: AppSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppSongService, useValue: appSongMock }],
    }).compile();
    service = module.get<AppSongService>(AppSongService);
  });

  it("should be defined", () => {
    expect(new SongLocalizeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new SongLocalizeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called sub not 0", () => {
    const httpArgumentsHostUserSubZero: HttpArgumentsHost = {
      ...httpArgumentsHost,
      getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "1" } })),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    new SongLocalizeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single song", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(song)),
    };
    new SongLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: localize", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(songLocalized)),
    };
    new SongLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of songs", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(songPagination)),
    };
    new SongLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
