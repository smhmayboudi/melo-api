import { Test, TestingModule } from "@nestjs/testing";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import config from "./file.config";
import { forwardRef } from "@nestjs/common";
import { AppModule } from "../app.module";
import { ConfigModule } from "@nestjs/config";

describe("FileCacheOptionsFactory", () => {
  let service: FileConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [FileConfigService]
    }).compile();

    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(new FileCacheOptionsFactory(service)).toBeDefined();
  });
});
