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

import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";

describe("AlbumController", () => {
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

  const albumServiceMock: AlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
  };

  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [{ provide: AlbumService, useValue: albumServiceMock }],
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albums should equal list of albums", async () => {
    const dto: AlbumArtistsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual(albumPagination);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
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
