import { ArtistResDto, DataArtistType, SongResDto } from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { ArtistLikeInterceptor } from "./artist.like.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("ArtistLikeInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      user: {
        sub: "1",
      },
    })),
    getResponse: jest.fn().mockImplementation(() => ({
      statusCode: 200,
    })),
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
  const song: SongResDto = {
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
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    songs: [song],
    type: DataArtistType.prime,
  };

  const appSongServiceMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let service: AppSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppSongService, useValue: appSongServiceMock }],
    }).compile();
    service = module.get<AppSongService>(AppSongService);
  });

  it("should be defined", () => {
    expect(new ArtistLikeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called sub: 0", () => {
    const httpArgumentsHostUserSubZero: HttpArgumentsHost = {
      ...httpArgumentsHost,
      getRequest: jest.fn().mockImplementation(() => ({
        user: {
          sub: "0",
        },
      })),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    const callHandler: CallHandler = {
      handle: jest.fn(() => of("")),
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(artist)),
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called songs undefined", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() =>
        of({
          ...artist,
          songs: undefined,
        })
      ),
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([artist])),
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
