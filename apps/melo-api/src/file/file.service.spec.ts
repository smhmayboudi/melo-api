import {
  FILE_SERVICE,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";

import { FileService } from "./file.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("FileService", () => {
  const date = new Date();
  const mimeType = "image/jpeg";
  const fileUploadImage: FileUploadImageResDto = {
    createdAt: date,
    fileKey: "",
    mimeType,
    originalname: "",
    size: 0,
  };

  // TODO: interface ?
  const fileClientProxyMock = {
    send: () => of(fileUploadImage),
  };

  let service: FileService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: FILE_SERVICE,
          useValue: fileClientProxyMock,
        },
      ],
    }).compile();
    service = module.get<FileService>(FileService);
  }, 40000);

  it("uploadImage should be equal to a file upload image", async () => {
    const dto: FileUploadImageReqDto = {
      bufferBase64:
        "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z",
      encoding: "",
      fieldname: "",
      mimeType,
      originalname: "",
      size: 0,
      sub: 1,
    };
    expect(await service.uploadImage(dto)).toEqual(fileUploadImage);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
    expect(await service.uploadImage(dto)).toEqual(fileUploadImage);
  });

  it.todo(
    "uploadImage should throw an error with dto === undefined || dto.buffer === undefined"
  );
});
