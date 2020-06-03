import { ConfigService } from "@nestjs/config";
import { RtConfigService } from "./rt.config.service";
import { Test } from "@nestjs/testing";

describe("RtConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: RtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RtConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("typeormDatabase should be equal to a value", () => {
    expect(service.typeormDatabase).toEqual("");
  });

  it("typeormHost should be equal to a value", () => {
    expect(service.typeormHost).toEqual("");
  });

  it("typeormLogging should be equal to a value", () => {
    expect(service.typeormLogging).toEqual(true);
  });

  it("typeormPassword should be equal to a value", () => {
    expect(service.typeormPassword).toEqual("");
  });

  it("typeormPort should be equal to a value", () => {
    expect(service.typeormPort).toEqual(0);
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect(service.typeormSynchronize).toEqual(true);
  });

  it("typeormUsername should be equal to a value", () => {
    expect(service.typeormUsername).toEqual("");
  });
});
