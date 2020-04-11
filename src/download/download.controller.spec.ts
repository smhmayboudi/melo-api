import { Test, TestingModule } from "@nestjs/testing";

import { AppCheckLikeService } from "../app/app.check-like.service";
import { AppCheckLikeServiceInterface } from "../app/app.check-like.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
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
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: "",
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

  const appMixSongServiceMock: AppCheckLikeServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
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
        { provide: AppCheckLikeService, useValue: appMixSongServiceMock },
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
