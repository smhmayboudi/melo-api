import { Test, TestingModule } from "@nestjs/testing";
import { RtController } from "./rt.controller";

describe("Rt Controller", () => {
  let controller: RtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtController]
    }).compile();

    controller = module.get<RtController>(RtController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("find");
});
