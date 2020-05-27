import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumController } from "./data.album.controller";
import { DataAlbumService } from "./data.album.service";
import { DataAlbumServiceInterface } from "./data.album.service.interface";

describe("DataAlbumController", () => {
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
  const album: AlbumResDto = {
    name: "",
    releaseDate,
  };
  const albumPagination: DataPaginationResDto<AlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;

  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
  };

  let controller: DataAlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAlbumController],
      providers: [
        { provide: DataAlbumService, useValue: dataAlbumServiceMock },
      ],
    }).compile();
    controller = module.get<DataAlbumController>(DataAlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albums should be equal to an dataAlbum", async () => {
    const dto: AlbumArtistsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual(albumPagination);
  });

  it("get should be equal to an dataAlbum", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should be equal to an dataAlbum", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual(albumPagination);
  });
});
