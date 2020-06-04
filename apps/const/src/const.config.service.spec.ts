import { ConfigService } from "@nestjs/config";
import { ConstConfigService } from "./const.config.service";
import { Test } from "@nestjs/testing";

describe("ConstConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: ConstConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConstConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<ConstConfigService>(ConstConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("staticImagePaths should be equal to a value", () => {
    expect(service.staticImagePaths).toEqual({
      "": "",
    });
  });
});
