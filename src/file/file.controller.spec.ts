import { Test } from "@nestjs/testing";
import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { FileServiceInterface } from "./file.service.interface";

describe("FileController", () => {
  const date = new Date();
  const fileUploadImage: FileUploadImageResDto = {
    createdAt: date,
    fileKey: "",
    mimeType: "jpg",
    originalname: "",
    size: 0
  };

  const fileServiceMock: FileServiceInterface = {
    uploadImage: (): Promise<FileUploadImageResDto> =>
      Promise.resolve(fileUploadImage)
  };

  let controller: FileController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: fileServiceMock
        }
      ]
    }).compile();
    controller = module.get<FileController>(FileController);
  });

  it("uploadedPic should eequal to a file upload image", async () => {
    const dto: FileUploadImageReqDto = {
      buffer: Buffer.from(""),
      createdAt: date,
      fileKey: "",
      mimeType: "jpg",
      originalname: "",
      size: 0
    };
    expect(await controller.uploadedPic(0, dto)).toEqual(fileUploadImage);
  });
});
