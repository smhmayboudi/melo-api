import { ConstImageReqDto, DataConfigImageReqDto } from "@melo/common";

import { DataImageService } from "./data.image.service";
import { Test } from "@nestjs/testing";

describe("ImageService", () => {
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

  let service: DataImageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DataImageService],
    }).compile();
    service = module.get<DataImageService>(DataImageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("all should be equal to a data image", async () => {
    const dto: ConstImageReqDto = {
      dataConfigImage,
      uri: "/asset/pop.jpg",
    };
    expect(await service.generateUrl(dto)).toEqual({
      cover: {
        url:
          "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
      },
    });
  });
});
