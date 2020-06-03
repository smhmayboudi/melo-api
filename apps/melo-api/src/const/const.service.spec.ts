import {
  ConstConfigReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  DataConfigImageReqDto,
} from "@melo/common";

import { ConstService } from "./const.service";
import { DataImageService } from "../data/data.image.service";
import { DataImageServiceInterface } from "../data/data.image.service.interface";
import { Test } from "@nestjs/testing";

describe("ConstService", () => {
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

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: () => Promise.resolve(image),
  };

  let service: ConstService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConstService,
        { provide: DataImageService, useValue: dataImageServiceMock },
      ],
    }).compile();
    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("images should be equal to an image", async () => {
    const dto: ConstImagesReqDto = {
      config,
      dataConfigImage,
    };
    expect(await service.images(dto)).toEqual({
      pop: image,
    });
  });
});
