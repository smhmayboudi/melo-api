import { Test, TestingModule } from "@nestjs/testing";
import { AtService } from "./at.service";

describe("AtService", () => {
  let service: AtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtService]
    }).compile();

    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("deleteById");
  test.todo("deleteByAt");
  test.todo("find");
  test.todo("findOneById");
  test.todo("findOneByAt");
  test.todo("save");
  test.todo("validateByUserId");
  test.todo("validateByAt");
});
