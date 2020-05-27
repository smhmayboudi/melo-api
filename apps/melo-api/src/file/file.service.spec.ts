import {
  FileConfigReqDto,
  FileUploadImageReqDto,
  FileUploadImageResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { FileEntity } from "./file.entity";
import { FileEntityRepositoryInterface } from "./file.entity.repository.interface";
import { FileService } from "./file.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import nock from "nock";

describe("FileService", () => {
  const config: FileConfigReqDto = {
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "127.0.0.1:9000",
    s3ForcePathStyle: false,
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
  };
  const date = new Date();
  const mimeType = "image/jpeg";
  const fileUploadImage: FileUploadImageResDto = {
    createdAt: date,
    fileKey: "",
    mimeType,
    originalname: "",
    size: 0,
  };
  const fileEntity: FileEntity = {
    bucket: "misc",
    created_at: date,
    e_tag: "",
    file_key: "",
    id: 0,
    mime_type: mimeType,
    owner_user_id: 0,
    size: 0,
  };
  // TODO: interface ?
  const managedUpload = {
    Bucket: "",
    ETag: "",
    Key: "",
  };

  const fileEntityRepositoryMock: FileEntityRepositoryInterface = {
    save: <FileEntity>(): Promise<FileEntity> =>
      (Promise.resolve(fileEntity) as unknown) as Promise<FileEntity>,
  };

  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(FileEntity),
          useValue: fileEntityRepositoryMock,
        },
        FileService,
      ],
    }).compile();
    service = module.get<FileService>(FileService);
    jest.mock("aws-sdk").fn(() => ({
      upload: (): Promise<unknown> => Promise.resolve(managedUpload),
    }));
  }, 40000);

  it("uploadImage should be equal to a file upload image", async () => {
    nock("http://misc.127.0.0.1:9000").put(/\/*/).reply(200);
    const dto: FileUploadImageReqDto = {
      bufferBase64:
        "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z",
      config,
      encoding: "",
      fieldname: "",
      mimeType,
      originalname: "",
      size: 0,
      sub: 1,
    };
    expect(await service.uploadImage(dto)).toEqual(fileUploadImage);
  });

  it.todo("uploadImage should throw an error dto undefined");

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("uploadImage should throw an error mimeType jpg", () => {
    const dto: FileUploadImageReqDto = {
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      ),
      bufferBase64: "",
      config,
      encoding: "",
      fieldname: "",
      mimeType,
      originalname: "",
      size: 0,
      sub: 1,
    };
    return expect(service.uploadImage(dto)).rejects.toThrowError();
  });

  it.todo("uploadImage should throw an error extension undefined");
});
