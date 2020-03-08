import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppImgProxyService } from "./app.img-proxy.service";

describe("ImgProxyService", () => {
  let service: AppImgProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, AppImgProxyService]
    }).compile();
    service = module.get<AppImgProxyService>(AppImgProxyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("all should be defined", () => {
    expect(service.generateUrl("")).toBeDefined();
  });
});
