import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import { AppConfigService } from "../app.config.service";

describe("FileCacheOptionsFactory", () => {
  let service: FileConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService, FileConfigService]
    }).compile();

    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(new FileCacheOptionsFactory(service)).toBeDefined();
  });
});
