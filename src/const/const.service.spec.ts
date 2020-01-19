import { Test, TestingModule } from "@nestjs/testing";
import { ConstService } from "./const.service";

describe("ConstService", () => {
  let service: ConstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstService]
    }).compile();

    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("images");
});
