import { Test, TestingModule } from "@nestjs/testing";
import { PROM_REGISTRY_DEFAULT } from "./prom.constant";
import { PromController } from "./prom.controller";

describe("Prom Controller", () => {
  let controller: PromController;

  // TODO: interface ?
  const registryMock = {
    metrics: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromController],
      providers: [{ provide: PROM_REGISTRY_DEFAULT, useValue: registryMock }]
    }).compile();
    controller = module.get<PromController>(PromController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("index should be called", () => {
    controller.index("");
    expect(registryMock.metrics).toBeCalled();
  });
});
