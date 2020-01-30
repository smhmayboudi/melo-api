import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppQueryStringService } from "../app.query-string.service";
import { AppConfigService } from "../app.config.service";
import { AppImgProxyService } from "../app.img-proxy.service";
import { ConstConfigService } from "./const.config.service";
import { ConstService } from "./const.service";

describe("ConstService", () => {
  let service: ConstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AppImgProxyService,
        AppQueryStringService,
        ConfigService,
        ConstService,
        ConstConfigService
      ]
    }).compile();

    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("images");
});
