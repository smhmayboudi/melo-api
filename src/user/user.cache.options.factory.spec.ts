import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserConfigService } from "./user.config.service";

describe("UserCacheOptionsFactory", () => {
  let service: UserConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService, UserConfigService]
    }).compile();

    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect(new UserCacheOptionsFactory(service)).toBeDefined();
  });
});
