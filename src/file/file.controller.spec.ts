import { FileController } from "./file.controller";
import { FileFileReqDto } from "./dto/req/file.file.req.dto";
import { FileFileResDto } from "./dto/res/file.file.res.dto";
import { FileService } from "./file.service";
import { FileServiceInterface } from "./file.service.interface";
import { Test } from "@nestjs/testing";

describe("FileController", () => {
  const date = new Date();
  const fileUploadImage: FileFileResDto = {
    createdAt: date,
    fileKey: "",
    mimeType: "jpg",
    originalname: "",
    size: 0,
  };

  const fileServiceMock: FileServiceInterface = {
    uploadImage: (): Promise<FileFileResDto> =>
      Promise.resolve(fileUploadImage),
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

  it("uploadedPic should eequal to a file upload image", async () => {
    const dto: FileFileReqDto = {
      buffer: Buffer.from(""),
      encoding: "",
      fieldname: "",
      mimeType: "image/jpeg",
      originalname: "",
      size: 0,
    };
    expect(await controller.uploadedPic(0, dto)).toEqual(fileUploadImage);
  });
});
