import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  EmotionEmotionsResDto,
  PlaylistResDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";
import { CallHandler, ExecutionContext } from "@nestjs/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { EmotionHashIdInterceptor } from "./emotion.hash-id.interceptor";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("EmotionHashIdInterceptor", () => {
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
  const search: SearchResDto = {
    album: album,
    type: SearchType.album,
  };
  const emotion: EmotionEmotionsResDto = {
    emotions: [""],
    song,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: () => album,
    encodeArtist: () => artist,
    encodePlaylist: () => playlist,
    encodeSearch: () => search,
    encodeSong: () => song,
  };

  let service: AppHashIdService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(new EmotionHashIdInterceptor(service)).toBeDefined();
  });

  it("intercept should be called data: single emotion", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of(emotion)),
    };
    new EmotionHashIdInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(callHandler.handle).toHaveBeenCalled();
  });

  it("intercept should be called data: list of emotions", () => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of([emotion])),
    };
    new EmotionHashIdInterceptor(service)
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(callHandler.handle).toHaveBeenCalled();
  });
});
