import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppCheckLikeService } from "../app/app.check-like.service";
import { AppCheckLikeServiceInterface } from "../app/app.check-like.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DownloadLikeInterceptor } from "./download.like.interceptor";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("DownloadLikeInterceptor", () => {
  const releaseDate = new Date();
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
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: "",
  };
  const download: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
  };
  const downloadPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [download],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(downloadPagination)),
  };

  const appMixSongServiceMock: AppCheckLikeServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
  };

  let service: AppCheckLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppCheckLikeService, useValue: appMixSongServiceMock },
      ],
    }).compile();
    service = module.get<AppCheckLikeService>(AppCheckLikeService);
  });

  it("should be defined", () => {
    expect(new DownloadLikeInterceptor(service)).toBeDefined();
  });

  it("intercept should be called data", () => {
    new DownloadLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
