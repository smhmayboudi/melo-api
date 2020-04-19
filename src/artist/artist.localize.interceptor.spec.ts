import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppSong } from "../app/app.song";
import { AppSongInterface } from "../app/app.song.interface";
import { ArtistLocalizeInterceptor } from "./artist.localize.interceptor";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
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
  const songPaginationLocalized: DataPaginationResDto<DataSongResDto> = {
    results: [songLocalized],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumLocalizedSong: DataAlbumResDto = {
    ...album,
    songs: songPaginationLocalized,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const albumPaginationSongsUndefined: DataPaginationResDto<DataAlbumResDto> = {
    results: [{ ...album, songs: undefined }],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const albumPaginationLocalizedSong: DataPaginationResDto<DataAlbumResDto> = {
    results: [albumLocalizedSong],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const artist: DataArtistResDto = {
    albums: albumPagination,
    followersCount: 0,
    id: 0,
    songs: songPagination,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<DataArtistResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(artist)),
  };

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
