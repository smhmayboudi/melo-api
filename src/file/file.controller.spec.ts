import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./file.config";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("FileController", () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config),
        TypeOrmModule.forFeature([FileEntityRepository])
      ],
      providers: [FileConfigService, FileService]
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("uploadImage");
});
