import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataPaginationResDto,
  DataSearchType,
  DownloadSongResDto,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DownloadHashIdInterceptor } from "./download.hash-id.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("DownloadHashIdInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest
      .fn()
      .mockImplementation(() => ({ body: { id: 0 }, params: { id: 0 } })),
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
    album: {
      artists: [artist],
      id: 0,
      name: "",
      releaseDate,
    },
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
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const download: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
  };
  const downloadPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [download],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;
  const album: AlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0,
  };
  const search: SearchResDto = {
    type: DataSearchType.album,
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(downloadPagination)),
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };

  let servce: AppHashIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    servce = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(new DownloadHashIdInterceptor(servce)).toBeDefined();
  });

  it("intercept should be called", () => {
    new DownloadHashIdInterceptor(servce)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(callHandler.handle).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    new DownloadHashIdInterceptor(servce)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(callHandler.handle).toHaveBeenCalled();
  });
});
