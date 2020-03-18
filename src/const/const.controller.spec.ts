import { Test, TestingModule } from "@nestjs/testing";

import { ConstController } from "./const.controller";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";

describe("ConstController", () => {
  const image = {
    pop: {
      cover: {
        url: "/asset/pop.jpg"
      }
    }
  };

  const constServiceMock: ConstServiceInterface = {
    images: (): Promise<{ [key: string]: ConstImageResDto }> =>
      Promise.resolve(image)
  };

  let controller: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController],
      providers: [{ provide: ConstService, useValue: constServiceMock }]
    }).compile();
    controller = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("images should be equal to an image", async () => {
    expect(await controller.images()).toEqual(image);
  });
});
