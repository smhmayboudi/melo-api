import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataPaginationResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumLocalizeInterceptor } from "./album.localize.interceptor";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("AlbumLocalizeInterceptor", () => {
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
  const songLocalized: SongResDto = {
    ...song,
    localized: true,
  };
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const songPaginationLocalized: DataPaginationResDto<SongResDto> = {
    results: [songLocalized],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const album: AlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumPagination: DataPaginationResDto<AlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(album)),
  };

  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let service: AppSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppSongService, useValue: appSongMock }],
    }).compile();
    service = module.get<AppSongService>(AppSongService);
  });

  it("should be defined", () => {
    expect(new AlbumLocalizeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
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
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single album", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(album)),
    };
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: localized", () => {
    const callHandlerAlbumLocalized: CallHandler = {
      handle: jest.fn(() => of({ ...album, songs: songPaginationLocalized })),
    };
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbumLocalized)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: undefined", () => {
    const callHandlerAlbumLocalized: CallHandler = {
      handle: jest.fn(() => of({ ...album, songs: undefined })),
    };
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbumLocalized)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of albums", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(albumPagination)),
    };
    new AlbumLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
