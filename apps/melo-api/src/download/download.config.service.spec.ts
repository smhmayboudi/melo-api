import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";

describe("DownloadConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: DownloadConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
  };

  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: DownloadConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<DownloadConfigService>(DownloadConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect(service.elasticsearchNode).toEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect(service.indexName).toEqual("");
  });

  it("cachePort should be equal to a value", () => {
    expect(service.maxSize).toEqual(0);
  });
});
