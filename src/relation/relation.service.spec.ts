import { Test, TestingModule } from "@nestjs/testing";
import { RelationService } from "./relation.service";

describe("RelationService", () => {
  let service: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationService]
    }).compile();

    service = module.get<RelationService>(RelationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("get");
  test.todo("has");
  test.todo("multiHas");
  test.todo("remove");
  test.todo("set");
});
