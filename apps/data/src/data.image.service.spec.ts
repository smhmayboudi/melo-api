import { DataConfigImageReqDto, DataImageReqDto } from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataImageService } from "./data.image.service";

describe("DataImageService", () => {
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
  let service: DataImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataImageService],
    }).compile();
    service = module.get<DataImageService>(DataImageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("all should be equal to a data image", async () => {
    const dto: DataImageReqDto = {
      dataConfigImage,
      uri: "",
    };
    expect(await service.generateUrl(dto)).toEqual({
      "": {
        url: "DA/rs:fill:0:0:1/dpr:1/",
      },
    });
  });
});
