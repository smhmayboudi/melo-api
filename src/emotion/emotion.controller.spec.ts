import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { EmotionController } from "./emotion.controller";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";

describe("EmotionController", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
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
  const emotion: EmotionResDto = {
    emotions: [""],
    song,
  };
  const emotionPagination: DataPaginationResDto<EmotionResDto> = {
    results: [emotion],
    total: 1,
  } as DataPaginationResDto<EmotionResDto>;
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

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };
  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<DataSongResDto> => Promise.resolve(song),
    likes: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto => song,
  };
  const emotionServiceMock: EmotionServiceInterface = {
    emotions: (): Promise<DataPaginationResDto<EmotionResDto>> =>
      Promise.resolve(emotionPagination),
  };

  let controller: EmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [
        { provide: EmotionService, useValue: emotionServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongMock },
      ],
    }).compile();
    controller = module.get<EmotionController>(EmotionController);
  });

  it("emotions should return a list of emotions", async () => {
    const paramDto: EmotionParamReqDto = {
      from: 0,
      size: 0,
    };
    const queryDto: EmotionQueryReqDto = {
      emotions: [""],
    };
    expect(await controller.emotions(paramDto, queryDto, 0)).toEqual(
      emotionPagination
    );
  });
});
