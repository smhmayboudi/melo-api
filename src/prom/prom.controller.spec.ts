import { Test, TestingModule } from "@nestjs/testing";
import { PromController } from "./prom.controller";

describe("Prom Controller", () => {
  let controller: PromController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromController]
    }).compile();

    controller = module.get<PromController>(PromController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
