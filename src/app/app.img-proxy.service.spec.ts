import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppImgProxyService } from "./app.img-proxy.service";

describe("ImgProxyService", () => {
  let service: AppImgProxyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
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
