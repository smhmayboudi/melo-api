import { HttpService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationConfigService } from "./relation.config.service";
import { RelationService } from "./relation.service";

describe("RelationService", () => {
  let service: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        HttpService,
        RelationConfigService,
        RelationService
      ]
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
