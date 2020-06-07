import {
  ConstImageReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";
import { Test } from "@nestjs/testing";

describe("ConstController", () => {
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
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
      uri: "asset/pop.jpg",
    };
    expect(await controller.image(dto)).toEqual(image);
  });

  it("images should be equal to images", async () => {
    const dto: ConstImagesReqDto = {};
    expect(await controller.images(dto)).toEqual(images);
  });
});
