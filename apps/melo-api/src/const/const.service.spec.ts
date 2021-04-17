import {
  CONST_SERVICE,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { ConstService } from "./const.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("ConstService", () => {
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const images: ConstImagesResDto = {
    pop: image,
  };

  const constClientProxyMock = {
    send: () => of(images),
  };

  let service: ConstService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConstService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
      ],
    }).compile();
    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("images should be equal to an image", async () => {
    const dto: ConstImagesReqDto = {};
    expect(await service.images(dto)).toEqual({
      pop: image,
    });
  });
});
