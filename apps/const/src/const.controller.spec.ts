import {
  ConstConfigReqDto,
  ConstImageReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
  DataConfigImageReqDto,
} from "@melo/common";

import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";
import { Test } from "@nestjs/testing";

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
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
  };
  const image: ConstImageResDto = {
    cover: {
      url:
        "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
    },
  };
  const images: ConstImagesResDto = {
    pop: image,
  };

  const constServiceMock: ConstServiceInterface = {
    image: () => Promise.resolve(image),
    images: () => Promise.resolve(images),
  };

  let controller: ConstController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ConstController],
      providers: [{ provide: ConstService, useValue: constServiceMock }],
    }).compile();
    controller = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("image should be equal to images", async () => {
    const dto: ConstImageReqDto = {
      dataConfigImage,
      uri: "/asset/pop.jpg",
    };
    expect(await controller.image(dto)).toEqual(image);
  });

  it("images should be equal to images", async () => {
    const dto: ConstImagesReqDto = {
      config,
      dataConfigImage,
    };
    expect(await controller.images(dto)).toEqual(images);
  });
});
