import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";

describe("RelationService", () => {
  let service: RelationConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [RelationConfigService]
    }).compile();

    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("timeout should be defined", () => {
    expect(service.timeout).toBeDefined();
  });

  it("url should be defined", () => {
    expect(service.url).toBeDefined();
  });
});
