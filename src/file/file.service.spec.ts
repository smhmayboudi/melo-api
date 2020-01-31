import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import config from "./file.config";
import { FileConfigService } from "./file.config.service";
import { FileEntityRepository } from "./file.entity.repository";
import { FileService } from "./file.service";

describe("FileService", () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([FileEntityRepository])
      ],
      providers: [FileConfigService, FileService]
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("uploadImage");
});
