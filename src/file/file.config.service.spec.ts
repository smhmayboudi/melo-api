import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./file.config";
import { FileConfigService } from "./file.config.service";

describe("FileService", () => {
  let service: FileConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [FileConfigService]
    }).compile();
    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("cacheHost should be defined", () => {
    expect(service.cacheHost).toBeDefined();
  });

  it("cacheMax should be defined", () => {
    expect(service.cacheMax).toBeDefined();
  });

  it("cachePort should be defined", () => {
    expect(service.cachePort).toBeDefined();
  });

  it("cacheStore should be defined", () => {
    expect(service.cacheStore).toBeDefined();
  });

  it("cacheTTL should be defined", () => {
    expect(service.cacheTTL).toBeDefined();
  });

  it("s3AccessKeyId should be defined", () => {
    expect(service.s3AccessKeyId).toBeDefined();
  });

  it("s3Bucket should be defined", () => {
    expect(service.s3Bucket).toBeDefined();
  });

  it("s3Endpoint should be defined", () => {
    expect(service.s3Endpoint).toBeDefined();
  });

  it("s3SecretAccessKey should be defined", () => {
    expect(service.s3SecretAccessKey).toBeDefined();
  });

  it("s3SslEnabled should be defined", () => {
    expect(service.s3SslEnabled).toBeDefined();
  });
});
