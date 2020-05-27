import {
  ConstConfigReqDto,
  ConstImagesReqDto,
  ConstImagesResDto,
  DataConfigImageReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";

describe("ConstController", () => {
  const config: ConstConfigReqDto = {
    staticImagePaths: {
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

  const constServiceMock: ConstServiceInterface = {
    images: (): Promise<ConstImagesResDto> => Promise.resolve(image),
  };

  let controller: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController],
      providers: [{ provide: ConstService, useValue: constServiceMock }],
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
