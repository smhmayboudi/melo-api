import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";

describe("UserCacheOptionsFactory", () => {
  let service: UserConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [UserConfigService]
    }).compile();

    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect(new UserCacheOptionsFactory(service)).toBeDefined();
  });
});
