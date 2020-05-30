import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataSearchType,
  EmotionEmotionsParamReqDto,
  EmotionEmotionsQueryReqDto,
  EmotionEmotionsResDto,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataConfigService } from "../../../data/src/data.config.service";
import { DataConfigServiceInterface } from "../../../data/src/data.config.service.interface";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionConfigServiceInterface } from "./emotion.config.service.interface";
import { EmotionController } from "./emotion.controller";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

describe("EmotionController", () => {
  const releaseDate = new Date();
  const album: AlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
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
  const emotion: EmotionEmotionsResDto = {
    emotions: [""],
    song,
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
  const appSongServiceMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticsearchNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };
  const emotionConfigServiceMock: EmotionConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
  };
  const emotionServiceMock: EmotionServiceInterface = {
    emotions: (): Promise<EmotionEmotionsResDto[]> =>
      Promise.resolve([emotion]),
  };

  let controller: EmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: EmotionConfigService, useValue: emotionConfigServiceMock },
        { provide: EmotionService, useValue: emotionServiceMock },
      ],
    }).compile();
    controller = module.get<EmotionController>(EmotionController);
  });

  it("emotions should return a list of emotions", async () => {
    const paramDto: EmotionEmotionsParamReqDto = {
      from: 0,
      size: 0,
    };
    const queryDto: EmotionEmotionsQueryReqDto = {
      emotions: [""],
    };
    expect(await controller.emotions(paramDto, queryDto, 0)).toEqual([emotion]);
  });
});
