import { Test, TestingModule } from "@nestjs/testing";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";

describe("RtService", () => {
  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtEntityRepository, RtService]
    }).compile();

    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("blockById");
  test.todo("blockByToken");
  test.todo("deleteById");
  test.todo("deleteByToken");
  test.todo("find");
  test.todo("findOneById");
  test.todo("findOneByToken");
  test.todo("save");
  test.todo("validateByUserId");
  test.todo("validateByToken");
});
