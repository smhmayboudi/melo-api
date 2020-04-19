import { Test, TestingModule } from "@nestjs/testing";

import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { DownloadHttpOptionsFactory } from "./download.http.options.factory";

describe("DownloadHttpOptionsFactory", () => {
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    timeout: 0,
    url: "",
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
    expect(new DownloadHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should return an option", () => {
    expect(
      new DownloadHttpOptionsFactory(service).createHttpOptions()
    ).toBeDefined();
  });
});
