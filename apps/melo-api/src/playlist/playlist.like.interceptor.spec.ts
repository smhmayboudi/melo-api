import { CallHandler, ExecutionContext } from "@nestjs/common";
import {
  DataArtistType,
  DataImageResDto,
  PlaylistResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { PlaylistLikeInterceptor } from "./playlist.like.interceptor";
import { of } from "rxjs";

describe("PlaylistLikeInterceptor", () => {
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
  const image: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
    },
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 0,
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
    expect(new PlaylistLikeInterceptor(service)).toBeDefined();
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
    const callHandler: CallHandler = {
      handle: jest.fn(() => of("")),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single playlist", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(playlist)),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: undefined", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() =>
        of({
          ...playlist,
          songs: undefined,
        })
      ),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of playlists", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([playlist])),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
