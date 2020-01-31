import { HttpModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";
import { RelationHttpModuleOptionsFactory } from "./relation.http.options.factory";
import { RelationModule } from "./relation.module";
import { RelationService } from "./relation.service";

describe("RelationService", () => {
  let service: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(config),
        HttpModule.registerAsync({
          imports: [RelationModule],
          useClass: RelationHttpModuleOptionsFactory
        })
      ],
      providers: [RelationConfigService, RelationService]
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
