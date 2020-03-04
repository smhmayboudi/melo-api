import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import { ConstConfigService } from "./const.config.service";
import { ConstService } from "./const.service";

describe("ConstService", () => {
  let service: ConstService;

  const appImgProxyServiceMock = {
    generateUrl: (): any => ({
      "": {
        url: ""
      }
    })
  };
  const constConfigServiceMock = {
    staticImagePaths: (): any => ({
      // eslint-disable-next-line prettier/prettier
      "pop_genre": "/asset/pop.jpg"
    })
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
    console.log("LOG: ", await service.images());
    expect(await service.images()).toEqual(res);
  });
});
