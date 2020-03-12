import { Test, TestingModule } from "@nestjs/testing";
import { DataPaginationResDto } from "src/data/dto/res/data.pagination.res.dto";
import { DownloadController } from "./download.controller";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadServiceInterface } from "./download.service.interface";
import { DownloadSortByType } from "./download.sort-by.type";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";

describe("DownloadController", () => {
  const downloadedAt = new Date();
  const downloadSong: DownloadSongResDto = {
    songId: 0,
    downloadedAt
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1
  } as DataPaginationResDto<DownloadSongResDto>;
  const downloadServiceMock: DownloadServiceInterface = {
    downloadedSongs: (): Promise<DataPaginationResDto<DownloadSongResDto>> =>
      Promise.resolve(downloadSongPagination)
  };

  let controller: DownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [{ provide: DownloadService, useValue: downloadServiceMock }]
    }).compile();
    controller = module.get<DownloadController>(DownloadController);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DownloadOrderByType.asc,
      sortBy: DownloadSortByType.date
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: ""
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
