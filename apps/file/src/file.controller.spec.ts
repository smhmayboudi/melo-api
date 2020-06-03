import {
  FileConfigReqDto,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";

import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FileServiceInterface } from "./file.service.interface";
import { Test } from "@nestjs/testing";

describe("FileController", () => {
  const config: FileConfigReqDto = {
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "127.0.0.1:9000",
    s3ForcePathStyle: false,
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
  };
  const date = new Date();
  const fileUploadImage: FileUploadImageResDto = {
    createdAt: date,
    fileKey: "",
    mimeType: "jpg",
    originalname: "",
    size: 0,
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
      config,
      encoding: "",
      fieldname: "",
      mimeType: "image/jpeg",
      originalname: "",
      size: 0,
      sub: 1,
    };
    expect(await controller.uploadImage(dto)).toEqual(fileUploadImage);
  });
});
