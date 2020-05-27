import { Test, TestingModule } from "@nestjs/testing";

import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { DownloadElasticsearchOptionsFactory } from "./download.elasticsearch.options.factory";

describe("DownloadElasticsearchOptionsFactory", () => {
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    elasticNode: "",
    indexName: "",
    maxSize: 0,
  };

  let service: DownloadConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DownloadConfigService,
          useValue: downloadConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<DownloadConfigService>(DownloadConfigService);
  });

  it("should be defined", () => {
    expect(new DownloadElasticsearchOptionsFactory(service)).toBeDefined();
  });

  it("createElasticsearchOptions should return an option", () => {
    expect(
      new DownloadElasticsearchOptionsFactory(
        service
      ).createElasticsearchOptions()
    ).toBeDefined();
  });
});
