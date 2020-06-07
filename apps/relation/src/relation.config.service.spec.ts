import { ConfigService } from "@nestjs/config";
import { RelationConfigService } from "./relation.config.service";
import { Test } from "@nestjs/testing";

describe("RelationConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: RelationConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RelationConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("dgraphAddress should be equal to a value", () => {
    expect(service.dgraphAddress).toEqual("");
  });

  it("dgraphDebug should be equal to a value", () => {
    expect(service.dgraphDebug).toEqual(true);
  });
});
