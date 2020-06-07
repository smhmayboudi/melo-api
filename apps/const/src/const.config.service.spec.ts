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

  it("imageBaseUrl should return value", () => {
    expect(service.imageBaseUrl).toEqual("");
  });

  it("imageEncode should be equal to a value", () => {
    expect(service.imageEncode).toEqual(true);
  });

  it("imageTypeSize should be equal to a value", () => {
    expect(service.imageTypeSize).toEqual([
      {
        height: 0,
        name: "",
        width: 0,
      },
    ]);
  });

  it("imageKey should be equal to a value", () => {
    expect(service.imageKey).toEqual("");
  });

  it("imageSalt should be equal to a value", () => {
    expect(service.imageSalt).toEqual("");
  });

  it("imageSignatureSize should be equal to a value", () => {
    expect(service.imageSignatureSize).toEqual(1);
  });

  it("staticImagePaths should be equal to a value", () => {
    expect(service.staticImagePaths).toEqual({
      "": "",
    });
  });
});
