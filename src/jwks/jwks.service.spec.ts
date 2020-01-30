import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";

describe("JwksService", () => {
  let service: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwksEntityRepository, JwksService]
    }).compile();

    service = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("findOneById");
  test.todo("getOneRandom");
});
