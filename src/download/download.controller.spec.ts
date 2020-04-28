import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
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
import { DownloadController } from "./download.controller";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadServiceInterface } from "./download.service.interface";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";

describe("DownloadController", () => {
  const downloadedAt = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate: downloadedAt,
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
    releaseDate: downloadedAt,
    title: "",
  };
  const downloadSong: DownloadSongResDto = {
    downloadedAt,
    song,
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate: downloadedAt,
    title: "",
    tracksCount: 0,
  };
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };

  const appEncodingServiceMock: AppEncodingServiceInterface = {
    album: (): DataAlbumResDto[] => [album],
    artist: (): DataArtistResDto[] => [artist],
    playlist: (): DataPlaylistResDto[] => [playlist],
    search: (): DataSearchResDto[] => [search],
    song: (): DataSongResDto[] => [song],
  };
  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto[] => [song],
  };
  const downloadServiceMock: DownloadServiceInterface = {
    downloadedSongs: (): Promise<DataPaginationResDto<DownloadSongResDto>> =>
      Promise.resolve(downloadSongPagination),
  };

  let controller: DownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [
        { provide: DownloadService, useValue: downloadServiceMock },
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
        { provide: AppSongService, useValue: appSongMock },
      ],
    }).compile();
    controller = module.get<DownloadController>(DownloadController);
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
      await controller.downloadedSongs(
        paramDto,
        queryDto,
        DownloadOrderByType.asc,
        DownloadSortByType.date,
        0
      )
    ).toEqual(downloadSongPagination);
  });
});
