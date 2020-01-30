import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "../app.img-proxy.service";
import { AppConfigService } from "../app.config.service";
import { AppQueryStringService } from "../app.query-string.service";
import { ConstConfigService } from "./const.config.service";
import { ConstController } from "./const.controller";
import { ConstService } from "./const.service";

describe("ConstController", () => {
  let controller: ConstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        AppImgProxyService,
        AppQueryStringService,
        ConfigService,
        ConstConfigService,
        ConstService
      ],
      controllers: [ConstController]
    }).compile();

    controller = module.get<ConstController>(ConstController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test.todo("images");
});
