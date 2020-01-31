import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";

describe("RelationService", () => {
  let service: RelationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [RelationConfigService]
    }).compile();

    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("timeout");
  test.todo("uri");
});
