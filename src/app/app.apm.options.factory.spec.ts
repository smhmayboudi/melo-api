import { Test, TestingModule } from "@nestjs/testing";
import { AppApmOptionsFactory } from "./app.apm.options.factory";
import { AppConfigService } from "./app.config.service";

describe("AppApmOptionsFactory", () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppApmOptionsFactory(service)).toBeDefined();
  });
});
