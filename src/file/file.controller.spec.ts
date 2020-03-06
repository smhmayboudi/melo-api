import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../app/app.module";
import config from "./file.config";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FileEntity } from "./file.entity";

describe("FileController", () => {
  const mockRepository = {
    save: {
      bucket: "",
      created_at: new Date(),
      e_tag: "",
      file_key: "",
      id: 0,
      mime_type: "",
      owner_user_id: 0,
      size: 0
    }
  };

  let controller: FileController;
  let service: FileService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FileController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        FileConfigService,
        FileService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: mockRepository
        }
      ]
    }).compile();
    service = module.get<FileService>(FileService);
    controller = module.get<FileController>(FileController);
  });

  describe("uploadImage", () => {
    it("should be defined", async () => {
      const res = {
        createdAt: new Date(),
        fileKey: "",
        mimeType: "",
        originalname: "",
        size: 0
      };
      const req = {
        buffer: new Buffer(""),
        createdAt: new Date(),
        fileKey: "",
        mimeType: "",
        originalname: "",
        size: 0
      };
      jest
        .spyOn(service, "uploadImage")
        .mockImplementation(() => Promise.resolve(res));

      expect(await controller.uploadedPic(0, req)).toBe(res);
    });
  });
});
