import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AlbumLikeInterceptor } from "./album.like.interceptor";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AppMixSongServiceInterface } from "../app/app.mix-song.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("AlbumLikeInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "1" } })),
    getResponse: jest.fn().mockImplementation(() => ({ statusCode: 200 }))
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn()
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(""))
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat
      }
    ],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: ""
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: songPagination
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1
  } as DataPaginationResDto<DataAlbumResDto>;
  const appMixSongServiceMock: AppMixSongServiceInterface = {
    mixSong: (): Promise<DataSongResDto[]> => Promise.resolve([song])
  };

  let service: AppMixSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppMixSongService, useValue: appMixSongServiceMock }
      ]
    }).compile();
    service = module.get<AppMixSongService>(AppMixSongService);
  });

  it("should be defined", () => {
    expect(new AlbumLikeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new AlbumLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called sub: 0", () => {
    const httpArgumentsHostUserSubZero: HttpArgumentsHost = {
      ...httpArgumentsHost,
      getRequest: jest.fn().mockImplementation(() => ({ user: { sub: "0" } }))
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero
    };
    new AlbumLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single album", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(album))
    };
    new AlbumLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of albums", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(albumPagination))
    };
    new AlbumLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
