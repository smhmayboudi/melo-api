import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataSearchType,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { ArtistHashIdInterceptor } from "./artist.hash-id.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { of } from "rxjs";

describe("ArtistHashIdInterceptor", () => {
  const releaseDate = new Date();
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      body: {
        id: 0,
      },
      params: {
        id: 0,
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
  const album: AlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: [song],
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

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };

  let service: AppHashIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(new ArtistHashIdInterceptor(service)).toBeDefined();
  });

  it("intercept should be called undefined", async () => {
    const httpArgumentsHost: HttpArgumentsHost = {
      getNext: jest.fn(),
      getRequest: jest.fn().mockImplementation(() => ({
        body: {
          idx: 0,
        },
        params: {
          idx: 0,
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
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(artist)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);

    new ArtistHashIdInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single artist", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(artist)),
    };
    new ArtistHashIdInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of artists", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([artist])),
    };
    new ArtistHashIdInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
