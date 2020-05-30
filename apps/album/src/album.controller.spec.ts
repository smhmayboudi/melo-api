import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";

describe("AlbumController", () => {
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
  const albumServiceMock: AlbumServiceInterface = {
    albums: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
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
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual([album]);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual([album]);
  });
});
