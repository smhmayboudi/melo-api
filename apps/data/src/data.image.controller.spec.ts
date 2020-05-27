import {
  DataConfigImageReqDto,
  DataImageReqDto,
  DataImageResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataImageController } from "./data.image.controller";
import { DataImageService } from "./data.image.service";
import { DataImageServiceInterface } from "./data.image.service.interface";

describe("DataImageController", () => {
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
  const dataImage: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
    },
  };

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: (): Promise<DataImageResDto> => Promise.resolve(dataImage),
  };

  let controller: DataImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataImageController],
      providers: [
        { provide: DataImageService, useValue: dataImageServiceMock },
      ],
    }).compile();
    controller = module.get<DataImageController>(DataImageController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("bulk should be equal to an dataImage", async () => {
    const dto: DataImageReqDto = {
      dataConfigImage,
      uri: "",
    };
    expect(await controller.generateUrl(dto)).toEqual(dataImage);
  });
});
