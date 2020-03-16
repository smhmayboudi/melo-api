import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadConfigService } from "./download.config.service";
import { DownloadOrderByType } from "./download.order-by.type";
import { DownloadService } from "./download.service";
import { DownloadSongParamReqDto } from "./dto/req/download.song.param.req.dto";
import { DownloadSongQueryReqDto } from "./dto/req/download.song.query.req.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { DownloadSortByType } from "./download.sort-by.type";
import { HttpService } from "@nestjs/common";

describe("DownloadService", () => {
  const downloadedAt = new Date();
  const downloadSong: DownloadSongResDto = {
    downloadedAt,
    songId: 0
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1
  } as DataPaginationResDto<DownloadSongResDto>;

  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<
      AxiosResponse<DataPaginationResDto<DownloadSongResDto>>
    > =>
      of({
        config: {},
        data: downloadSongPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadService,
        { provide: DownloadConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<DownloadService>(DownloadService);
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
