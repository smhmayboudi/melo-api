import { FileUploadImageReqDto, FileUploadImageResDto } from "@melo/common";

import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileEntity } from "./file.entity";
import { FileEntityRepositoryInterface } from "./file.entity.repository.interface";
import { FileService } from "./file.service";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nock = require("nock");
nock("http://misc.localhost:9000").put(/\/*/).reply(200);

jest.mock("aws-sdk").fn(() => ({
  upload: () =>
    Promise.resolve({
      Bucket: "misc",
      ETag: "",
      Key: "",
    }),
}));

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

  const fileConfigServiceMock: FileConfigServiceInterface = {
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "localhost:9000",
    s3ForcePathStyle: false,
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };
  const fileEntityRepositoryMock: FileEntityRepositoryInterface = {
    save: <FileEntity>(): Promise<FileEntity> =>
      (Promise.resolve(fileEntity) as unknown) as Promise<FileEntity>,
  };

  let service: FileService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: FileConfigService,
          useValue: fileConfigServiceMock,
        },
        {
          provide: getRepositoryToken(FileEntity),
          useValue: fileEntityRepositoryMock,
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

  it("uploadImage should throw an error mimeType jpg", () => {
    const dto: FileUploadImageReqDto = {
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      ),
      bufferBase64: "",
      encoding: "",
      fieldname: "",
      mimeType,
      originalname: "",
      size: 0,
      sub: 1,
    };
    return expect(service.uploadImage(dto)).rejects.toThrowError();
  });

  it.todo("uploadImage should throw an error with extension undefined");
});
