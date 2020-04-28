/* eslint-disable @typescript-eslint/unbound-method */
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { EmotionHashIdInterceptor } from "./emotion.hash-id.interceptor";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("EmotionHashIdInterceptor", () => {
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
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const song: DataSongResDto = {
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const emotion: EmotionResDto = {
    emotions: [""],
    song,
  };
  const emotionPagination: DataPaginationResDto<EmotionResDto> = {
    results: [emotion],
    total: 1,
  } as DataPaginationResDto<EmotionResDto>;
  const album: DataAlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const playlist: DataPlaylistResDto = {
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
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(emotionPagination)),
  };

  const appEncodingServiceMock: AppEncodingServiceInterface = {
    album: (): DataAlbumResDto[] => [album],
    artist: (): DataArtistResDto[] => [artist],
    playlist: (): DataPlaylistResDto[] => [playlist],
    search: (): DataSearchResDto[] => [search],
    song: (): DataSongResDto[] => [song],
  };

  let encodingService: AppEncodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
      ],
    }).compile();
    encodingService = module.get<AppEncodingService>(AppEncodingService);
  });

  it("should be defined", () => {
    expect(new EmotionHashIdInterceptor(encodingService)).toBeDefined();
  });

  it("intercept should be called", () => {
    new EmotionHashIdInterceptor(encodingService)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(callHandler.handle).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    new EmotionHashIdInterceptor(encodingService)
      .intercept(executionContext, callHandler)
      .subscribe();
    expect(callHandler.handle).toHaveBeenCalled();
  });
});
