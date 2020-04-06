import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AppMixSongServiceInterface } from "../app/app.mix-song.service.interface";
import { ArtistLikeInterceptor } from "./artist.like.interceptor";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("ArtistLikeInterceptor", () => {
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
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1
  } as DataPaginationResDto<DataArtistResDto>;
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
    expect(new ArtistLikeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called", () => {
    new ArtistLikeInterceptor(service)
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
    new ArtistLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(artist))
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandlerAlbum: CallHandler = {
      handle: jest.fn(() => of(artistPagination))
    };
    new ArtistLikeInterceptor(service)
      .intercept(executionContext, callHandlerAlbum)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
