import { Test, TestingModule } from "@nestjs/testing";
import { RtService } from "./rt.service";

describe("RtService", () => {
  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtService]
    }).compile();

    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("deleteById");
  test.todo("deleteByRt");
  test.todo("find");
  test.todo("findOneById");
  test.todo("findOneByRt");
  test.todo("save");
  test.todo("validateByUserId");
  test.todo("validateByRt");
});
