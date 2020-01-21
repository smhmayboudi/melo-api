import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { ActionConfigService } from "./action.config.service";

describe("ActionService", () => {
  let service: ActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ActionConfigService]
    }).compile();

    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheTTL");
});
