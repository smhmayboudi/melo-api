import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationConfigService } from "./relation.config.service";

describe("RelationService", () => {
  let service: RelationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, RelationConfigService]
    }).compile();

    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("uri");
});
