import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import config from "./file.config";
import { forwardRef } from "@nestjs/common";
import { FileConfigService } from "./file.config.service";
import { FileService } from "./file.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";

const fileEntityRepositoryMock = jest.fn(() => ({
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
}));

const req = {
  buffer: new Buffer(""),
  createdAt: new Date(),
  fileKey: "",
  mimeType: "",
  originalname: "",
  size: 0
};
const res = {
  createdAt: new Date(),
  fileKey: "",
  mimeType: "",
  originalname: "",
  size: 0
};

describe("FileService", () => {
  let fileService: FileService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        FileConfigService,
        FileService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: fileEntityRepositoryMock
        }
      ]
    }).compile();
    fileService = module.get<FileService>(FileService);
  });
  it("uploadImage should defined", async () => {
    jest
      .spyOn(fileService, "uploadImage")
      .mockImplementation(() => Promise.resolve(res));

    expect(await fileService.uploadImage(req, 0)).toBe(res);
  });
});
