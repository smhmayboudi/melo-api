import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumFollowInterceptor } from "./album.follow.interceptor";
import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("AlbumFollowInterceptor", () => {
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
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
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
  const album: AlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: [song],
  };
  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };

  let service: AppArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppArtistService, useValue: appArtistServiceMock },
      ],
    }).compile();
    service = module.get<AppArtistService>(AppArtistService);
  });

  it("should be defined", () => {
    expect(new AlbumFollowInterceptor(service)).toBeDefined();
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
    new AlbumFollowInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single album", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(album)),
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called artists undefined", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() =>
        of({
          ...album,
          artists: undefined,
        })
      ),
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of albums", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([album])),
    };
    new AlbumFollowInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
