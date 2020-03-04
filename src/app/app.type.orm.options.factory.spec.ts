import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppTypeOrmOptionsFactory } from "./app.type.orm.options.factory";
import { AppConfigService } from "./app.config.service";

describe("AppTypeOrmOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppTypeOrmOptionsFactory(service)).toBeDefined();
  });
});
