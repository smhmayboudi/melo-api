import { Test, TestingModule } from "@nestjs/testing";
import { TokenService } from "./token.service";

describe("TokenService", () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService]
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("deleteByToken");
  test.todo("find");
  test.todo("findOne");
  test.todo("findOneByToken");
  test.todo("save");
});