import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PlaylistResDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { PlaylistLikeInterceptor } from "./playlist.like.interceptor";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("PlaylistLikeInterceptor", () => {
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
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "000000000000000000000000",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };

  const appSongServiceMock: AppSongServiceInterface = {
    like: () => Promise.resolve(song),
    likes: () => Promise.resolve([song]),
    localize: () => Promise.resolve(song),
  };

  let service: AppSongService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: AppSongService, useValue: appSongServiceMock }],
    }).compile();
    service = module.get<AppSongService>(AppSongService);
  });

  it("should be defined", () => {
    expect(new PlaylistLikeInterceptor(service)).toBeDefined();
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
    const callHandler: CallHandler = {
      handle: jest.fn(() => of("")),
    };
    const executionContextSubZero: ExecutionContext = {
      ...executionContext,
      switchToHttp: () => httpArgumentsHostUserSubZero,
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContextSubZero, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHostUserSubZero.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: single playlist", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(playlist)),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called song: undefined", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() =>
        of({
          ...playlist,
          songs: undefined,
        })
      ),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it("intercept should be called data: list of playlists", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([playlist])),
    };
    new PlaylistLikeInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });
});
