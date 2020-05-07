import { Test, TestingModule } from "@nestjs/testing";

import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileEntity } from "./file.entity";
import { FileEntityRepositoryInterface } from "./file.entity.repository.interface";
import { FileFileReqDto } from "./dto/req/file.file.req.dto";
import { FileFileResDto } from "./dto/res/file.file.res.dto";
import { FileService } from "./file.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import nock from "nock";

describe("FileService", () => {
  const buffer = Buffer.from(
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKpgA//Z",
    "base64"
  );
  const date = new Date();
  const mimeType = "image/jpeg";
  const file: FileFileReqDto = {
    buffer,
    encoding: "",
    fieldname: "",
    mimeType,
    originalname: "",
    size: 0,
  };
  const fileUploadImage: FileFileResDto = {
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

  const fileConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "127.0.0.1:9000",
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
  };
  const fileEntityRepositoryMock: FileEntityRepositoryInterface = {
    save: <FileEntity>(): Promise<FileEntity> =>
      (Promise.resolve(fileEntity) as unknown) as Promise<FileEntity>,
  };

  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FileConfigService, useValue: fileConfigServiceMock },
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
    nock("http://127.0.0.1:9000")
      .put(/\/misc\/.*/)
      .reply(200);

    expect(await service.uploadImage(0, file)).toEqual(fileUploadImage);
  });

  it("uploadImage should throw an error dto undefined", () => {
    return expect(service.uploadImage(0, undefined)).rejects.toThrowError();
  });

  it("uploadImage should throw an error mimeType jpg", () => {
    const dto: FileFileReqDto = {
      ...file,
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      ),
    };
    return expect(service.uploadImage(0, dto)).rejects.toThrowError();
  });

  it.todo("uploadImage should throw an error extension undefined");
});
