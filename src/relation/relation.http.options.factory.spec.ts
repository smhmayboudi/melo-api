import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationHttpModuleOptionsFactory } from "./relation.http.options.factory";
import { RelationConfigService } from "./relation.config.service";

describe("RelationHttpModuleOptionsFactory", () => {
  let service: RelationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, RelationConfigService]
    }).compile();

    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(new RelationHttpModuleOptionsFactory(service)).toBeDefined();
  });
});
