import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppImgProxyService } from "./app.img-proxy.service";

describe("ImgProxyService", () => {
  let service: AppImgProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, AppImgProxyService, ConfigService]
    }).compile();

    service = module.get<AppImgProxyService>(AppImgProxyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("all");
  test.todo("make");
});
