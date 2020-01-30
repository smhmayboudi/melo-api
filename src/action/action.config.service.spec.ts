import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { ActionConfigService } from "./action.config.service";

describe("ActionService", () => {
  let service: ActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionConfigService, AppConfigService, ConfigService]
    }).compile();

    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
});
