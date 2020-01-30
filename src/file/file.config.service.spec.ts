import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app.config.service";
import { FileConfigService } from "./file.config.service";

describe("FileService", () => {
  let service: FileConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, ConfigService, FileConfigService]
    }).compile();

    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("cacheHost");
  test.todo("cacheMax");
  test.todo("cachePort");
  test.todo("cacheStore");
  test.todo("cacheTTL");
  test.todo("s3AccessKeyId");
  test.todo("s3Bucket");
  test.todo("s3Endpoint");
  test.todo("s3SecretAccessKey");
  test.todo("S3SslEnabled");
});
