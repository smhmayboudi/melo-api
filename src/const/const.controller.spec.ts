import { Test, TestingModule } from "@nestjs/testing";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";
import { ConstServiceInterface } from "./const.service.interface";
import { ConstImageResDto } from "./dto/res/const.image.res.dto";

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

  let constController: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController],
      providers: [{ provide: ConstService, useValue: constServiceMock }]
    }).compile();
    constController = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(constController).toBeDefined();
  });

  it("images should be defined", async () => {
    expect(await constController.images()).toEqual(image);
  });
});
