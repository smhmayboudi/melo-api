import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataPaginationResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("ArtistLocalizeInterceptor", () => {
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
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumLocalizedSong: AlbumResDto = {
    ...album,
    songs: songPaginationLocalized,
  };
  const albumPagination: DataPaginationResDto<AlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
  const albumPaginationSongsUndefined: DataPaginationResDto<AlbumResDto> = {
    results: [{ ...album, songs: undefined }],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
  const albumPaginationLocalizedSong: DataPaginationResDto<AlbumResDto> = {
    results: [albumLocalizedSong],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
  const artist: ArtistResDto = {
    albums: albumPagination,
    followersCount: 0,
    id: 0,
    songs: songPagination,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<ArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<ArtistResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(artist)),
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
    expect(new ArtistLocalizeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new ArtistLocalizeInterceptor(service)
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
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of({ ...artist, songs: undefined })),
    };
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: localized", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() =>
        of({
          ...artist,
          albums: albumPaginationLocalizedSong,
          songs: songPaginationLocalized,
        })
      ),
    };
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(artistPagination)),
    };
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called albums undefined", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of({ ...artist, albums: undefined })),
    };
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called albums songs undefined", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() =>
        of({ ...artist, albums: albumPaginationSongsUndefined })
      ),
    };
    new ArtistLocalizeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
