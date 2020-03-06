import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppImgProxyServiceInterface } from "../app/app.img-proxy.service.interface";
import { DataImageResDto } from "../data/dto/res/data.image.res.dto";
import { ConstConfigService } from "./const.config.service";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { ConstService } from "./const.service";

describe("ConstService", () => {
  let service: ConstService;

  const appImgProxyServiceMock: AppImgProxyServiceInterface = {
    generateUrl: (): DataImageResDto => ({
      "": {
        url: ""
      }
    })
  };
  const constConfigServiceMock: ConstConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    staticImagePaths: "/asset/pop.jpg"
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstService,
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock },
        { provide: ConstConfigService, useValue: constConfigServiceMock }
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
    expect(await service.images()).toEqual(res);
  });
});
