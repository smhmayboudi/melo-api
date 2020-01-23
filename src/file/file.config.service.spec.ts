import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { FileConfigService } from "./file.config.service";

describe("FileService", () => {
  let service: FileConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, FileConfigService]
    }).compile();

    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("accessKeyId");
  test.todo("bucket");
  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheTTL");
  test.todo("endpoint");
  test.todo("secretAccessKey");
  test.todo("sslEnabled");
});
