import {
  ConstConfigReqDto,
  ConstImagesReqDto,
  DataConfigImageReqDto,
  DataImageResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ConstService } from "./const.service";
import { DataImageService } from "../data/data.image.service";
import { DataImageServiceInterface } from "../data/data.image.service.interface";

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
      url: "/asset/pop.jpg",
    },
  };

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: (): Promise<DataImageResDto> => Promise.resolve(image),
  };

  let service: ConstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    expect(await service.images(dto)).toEqual({ pop: image });
  });
});
