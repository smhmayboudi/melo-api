import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "./app.img-proxy.service";

describe("ImgProxyService", () => {
  let service: AppImgProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppImgProxyService]
    }).compile();

    service = module.get<AppImgProxyService>(AppImgProxyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("image");
});
