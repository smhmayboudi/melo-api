import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { EmotionConfigService } from "./emotion.config.service";
import { EmotionDataResDto } from "./dto/res/emotion.data.res.dto";
import { EmotionParamReqDto } from "./dto/req/emotion.param.req.dto";
import { EmotionQueryReqDto } from "./dto/req/emotion.query.req.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { EmotionService } from "./emotion.service";
import { HttpService } from "@nestjs/common";
import { SongService } from "../song/song.service";
import { SongServiceInterface } from "../song/song.service.interface";

describe("EmotionService", () => {
  const releaseDate = new Date();
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const emotion: EmotionResDto = {
    emotions: [""],
    song,
  };
  const emotionData: EmotionDataResDto = {
    emotions: [""],
    songId: 0,
  };
  const emotionPagination: DataPaginationResDto<EmotionResDto> = {
    results: [emotion],
    total: 1,
  } as DataPaginationResDto<EmotionResDto>;
  const emotionDataPagination: DataPaginationResDto<EmotionDataResDto> = {
    results: [emotionData],
    total: 1,
  } as DataPaginationResDto<EmotionDataResDto>;
  const songServiceMock: SongServiceInterface = {
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    genre: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    like: (): Promise<DataSongResDto> => Promise.resolve(song),
    liked: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    searchMood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    unlike: (): Promise<DataSongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<
      AxiosResponse<DataPaginationResDto<EmotionDataResDto>>
    > =>
      of({
        config: {},
        data: emotionDataPagination,
        headers: {},
        status: 200,
        statusText: "",
      }),
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: EmotionConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const paramDto: EmotionParamReqDto = {
      from: 0,
      limit: 0,
    };
    const queryDto: EmotionQueryReqDto = {
      emotions: [""],
    };
    expect(await service.emotions(paramDto, queryDto, 0)).toEqual(
      emotionPagination
    );
  });
});
