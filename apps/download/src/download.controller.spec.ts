import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DownloadConfigReqDto,
  DownloadOrderByType,
  DownloadSongReqDto,
  DownloadSongResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import { DownloadServiceInterface } from "./download.service.interface";

describe("DownloadController", () => {
  const config: DownloadConfigReqDto = {
    indexName: "",
    maxSize: 0,
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const releaseDate = new Date();
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
  const downloadSong: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;

  const downloadServiceMock: DownloadServiceInterface = {
    downloadedSongs: (): Promise<DataPaginationResDto<DownloadSongResDto>> =>
      Promise.resolve(downloadSongPagination),
  };

  let controller: DownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [{ provide: DownloadService, useValue: downloadServiceMock }],
    }).compile();
    controller = module.get<DownloadController>(DownloadController);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const dto: DownloadSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      filter: "",
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await controller.downloadedSongs(dto)).toEqual(
      downloadSongPagination
    );
  });
});
