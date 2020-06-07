import { ConstImageResDto, ConstImagesReqDto } from "@melo/common";

import { ConstConfigService } from "./const.config.service";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { ConstService } from "./const.service";
import { Test } from "@nestjs/testing";

describe("ConstService", () => {
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };

  const constConfigServiceMock: ConstConfigServiceInterface = {
    imageBaseUrl: "",
    imageEncode: false,
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
    staticImagePaths: {
      pop: "asset/pop.jpg",
    },
  };

  let service: ConstService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConstService,
        { provide: ConstConfigService, useValue: constConfigServiceMock },
      ],
    }).compile();
    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("images should be equal to images", async () => {
    const dto: ConstImagesReqDto = {};
    expect(await service.images(dto)).toEqual({
      pop: image,
    });
  });
});
