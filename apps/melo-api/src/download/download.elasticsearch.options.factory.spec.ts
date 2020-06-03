import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { DownloadElasticsearchOptionsFactory } from "./download.elasticsearch.options.factory";
import { Test } from "@nestjs/testing";

describe("DownloadElasticsearchOptionsFactory", () => {
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
  };

  let service: DownloadConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
