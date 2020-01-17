import { Test, TestingModule } from "@nestjs/testing";
import { AtController } from "./at.controller";

describe("At Controller", () => {
  let controller: AtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtController]
    }).compile();

    controller = module.get<AtController>(AtController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("find");
});
