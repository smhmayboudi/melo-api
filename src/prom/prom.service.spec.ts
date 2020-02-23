import { Test, TestingModule } from "@nestjs/testing";
import { PromService } from "./prom.service";

describe("PromService", () => {
  let service: PromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromService]
    }).compile();

    service = module.get<PromService>(PromService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("*");
});
