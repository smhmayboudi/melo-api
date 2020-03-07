import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileEntity } from "./file.entity";
import { FileEntityRepositoryInterface } from "./file.entity.repository.interface";
import { FileService } from "./file.service";

describe("FileService", () => {
  const date = new Date();
  const fileEntity: FileEntity = {
    bucket: "",
    created_at: date,
    e_tag: "",
    file_key: "",
    id: 0,
    mime_type: "",
    owner_user_id: 0,
    size: 0
  };

  const fileConfigServiceMock: FileConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0
  };
  const fileEntityRepositoryMock: FileEntityRepositoryInterface = {
    save: <FileEntity>(): Promise<FileEntity> =>
      (Promise.resolve(fileEntity) as unknown) as Promise<FileEntity>
  };

  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: FileConfigService, useValue: fileConfigServiceMock },
        {
          provide: getRepositoryToken(FileEntity),
          useValue: fileEntityRepositoryMock
        },
        FileService
      ]
    }).compile();
    service = module.get<FileService>(FileService);
  });

  it("uploadImage should defined", async () => {
    const dto: FileUploadImageReqDto = {
      buffer: Buffer.from(""),
      createdAt: date,
      fileKey: "",
      mimeType: "jpg",
      originalname: "",
      size: 0
    };
    expect(await service.uploadImage(dto, 0)).toEqual(fileEntity);
  });

  it.todo("BadRequestException 1");
  it.todo("BadRequestException 2");
});
