import { FileUploadImageReqDto, FileUploadImageResDto } from "@melo/common";

import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FileServiceInterface } from "./file.service.interface";
import { Test } from "@nestjs/testing";

describe("FileController", () => {
  const date = new Date();
  const fileUploadImage: FileUploadImageResDto = {
    createdAt: date,
    fileKey: "",
    mimeType: "jpg",
    originalname: "",
    size: 0,
  };

  const fileConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };
  const fileServiceMock: FileServiceInterface = {
    uploadImage: () => Promise.resolve(fileUploadImage),
  };

  let controller: FileController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileConfigService,
          useValue: fileConfigServiceMock,
        },
        {
          provide: FileService,
          useValue: fileServiceMock,
        },
      ],
    }).compile();
    controller = module.get<FileController>(FileController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("uploadImage should equal to a file upload image", async () => {
    const dto: FileUploadImageReqDto = {
      buffer: Buffer.from(""),
      bufferBase64: "",
      encoding: "",
      fieldname: "",
      mimeType: "image/jpeg",
      originalname: "",
      size: 0,
      sub: 1,
    };
    expect(await controller.uploadImage(0, dto)).toEqual(fileUploadImage);
  });

  it.todo(
    "uploadImage should throw an error with dto === undefined || dto.buffer === undefined"
  );
});
