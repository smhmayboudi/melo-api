import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppArtist } from "../app/app.artist";
import { AppArtistInterface } from "../app/app.artist.interface";
import { ArtistFollowInterceptor } from "./artist.follow.interceptor";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("ArtistFollowInterceptor", () => {
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
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;

  const appMixArtistServiceMock: AppArtistInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };

  let service: AppArtist;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppArtist, useValue: appMixArtistServiceMock }],
    }).compile();
    service = module.get<AppArtist>(AppArtist);
  });

  it("should be defined", () => {
    expect(new ArtistFollowInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new ArtistFollowInterceptor(service)
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
    new ArtistFollowInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(artist)),
    };
    new ArtistFollowInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(artistPagination)),
    };
    new ArtistFollowInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
