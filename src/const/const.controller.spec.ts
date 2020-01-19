import { Test, TestingModule } from "@nestjs/testing";
import { ConstController } from "./const.controller";

describe("Const Controller", () => {
  let controller: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstController]
    }).compile();

    controller = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("images");
});
