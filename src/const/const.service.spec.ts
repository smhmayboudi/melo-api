import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./const.config";
import { ConstConfigService } from "./const.config.service";
import { ConstService } from "./const.service";
import { AppImgProxyService } from "../app/app.img-proxy.service";

describe("ConstService", () => {
  let service: ConstService;

  const appImgProxyServiceMock = jest.fn(() => ({
    generateUrl: {
      "": {
        url: ""
      }
    }
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        ConstConfigService,
        ConstService,
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock }
      ]
    }).compile();

    service = module.get<ConstService>(ConstService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("images should be defined", async () => {
    const res = {
      "": {
        "": {
          url: ""
        }
      }
    };
    jest
      .spyOn(service, "images")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.images()).toBe(res);
  });
});
