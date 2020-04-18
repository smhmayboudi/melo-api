import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DownloadConfigService } from "./download.config.service";
import { DownloadDataSongResDto } from "./dto/res/download.data.song.res.dto";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";
import { HttpService } from "@nestjs/common";
import { SongService } from "../song/song.service";
import { SongServiceInterface } from "../song/song.service.interface";

describe("DownloadService", () => {
  const downloadedAt = new Date();
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
    releaseDate: downloadedAt,
    title: "",
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const downloadSong: DownloadSongResDto = {
    downloadedAt,
    song,
  };
  const downloadDataSong: DownloadDataSongResDto = {
    downloadedAt,
    songId: 0,
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;
  const downloadDataSongPagination: DataPaginationResDto<DownloadDataSongResDto> = {
    results: [downloadDataSong],
    total: 1,
  } as DataPaginationResDto<DownloadDataSongResDto>;

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
      AxiosResponse<DataPaginationResDto<DownloadDataSongResDto>>
    > =>
      of({
        config: {},
        data: downloadDataSongPagination,
        headers: {},
        status: 200,
        statusText: "",
      }),
  };

  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadService,
        { provide: DownloadConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();
    service = module.get<DownloadService>(DownloadService);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DownloadOrderByType.asc,
      sortBy: DownloadSortByType.date,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: "",
    };
    expect(
      await service.downloadedSongs(
        paramDto,
        queryDto,
        DownloadOrderByType.asc,
        DownloadSortByType.date,
        0
      )
    ).toEqual(downloadSongPagination);
  });
});
