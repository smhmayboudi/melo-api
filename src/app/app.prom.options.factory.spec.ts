import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppPromOptionsFactory } from "./app.prom.options.factory";

describe("AppPromOptionsFactory", () => {
  // TODO interface ?
  const appConfigServiceMock = {
    promDefaultLabels: "",
    promDefaultMetricsEnabled: "",
    promPrefix: "",
    promPath: ""
  };
  const options = {
    defaultLabels: appConfigServiceMock.promDefaultLabels,
    defaultMetrics: {
      enabled: appConfigServiceMock.promDefaultMetricsEnabled,
      config: {
        prefix: appConfigServiceMock.promPrefix
      }
    },
    path: appConfigServiceMock.promPath,
    prefix: appConfigServiceMock.promPrefix,
    registryName: undefined
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppConfigService, useValue: appConfigServiceMock }]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppPromOptionsFactory(service)).toBeDefined();
  });

  it("createPromOptions should be equal to a value", () => {
    expect(new AppPromOptionsFactory(service).createPromOptions()).toEqual(
      options
    );
  });
});
