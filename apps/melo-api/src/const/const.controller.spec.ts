import {
  ConstConfigReqDto,
  ConstImagesReqDto,
  ConstImagesResDto,
  DataConfigImageReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ConstConfigService } from "./const.config.service";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";
import { DataConfigService } from "../../../data/src/data.config.service";
import { DataConfigServiceInterface } from "../../../data/src/data.config.service.interface";

describe("ConstController", () => {
  const config: ConstConfigReqDto = {
    staticImagePaths: {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      pop: "/asset/pop.jpg",
    },
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
  // TODO: interface ?
  const image = {
    pop: {
      cover: {
        url: "/asset/pop.jpg",
      },
    },
  };

  const constConfigServiceMock: ConstConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    staticImagePaths: { pop: "/asset/pop.jpg" },
  };
  const constServiceMock: ConstServiceInterface = {
    images: (): Promise<ConstImagesResDto> => Promise.resolve(image),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };

  let controller: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController],
      providers: [
        { provide: ConstConfigService, useValue: constConfigServiceMock },
        { provide: ConstService, useValue: constServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
      ],
    }).compile();
    controller = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("images should be equal to an image", async () => {
    const dto: ConstImagesReqDto = {
      config,
      dataConfigImage,
    };
    expect(await controller.images(dto)).toEqual(image);
  });
});
