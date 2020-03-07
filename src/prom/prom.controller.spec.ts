import { Test, TestingModule } from "@nestjs/testing";
import { Registry } from "prom-client";
import { PROM_REGISTRY_DEFAULT } from "./prom.constant";
import { PromController } from "./prom.controller";

describe("Prom Controller", () => {
  let controller: PromController;
  let registry: Registry;

  // TODO: interface ?
  const registryMock = {
    metrics: ""
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromController],
      providers: [{ provide: PROM_REGISTRY_DEFAULT, useValue: registryMock }]
    }).compile();
    controller = module.get<PromController>(PromController);
    registry = module.get<Registry>(PROM_REGISTRY_DEFAULT);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("index should be defined", () => {
    jest.spyOn(registry, "metrics").mockImplementation(() => "");

    expect(controller.index("")).toBeDefined();
  });
});
