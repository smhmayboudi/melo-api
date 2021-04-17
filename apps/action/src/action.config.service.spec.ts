import { ActionConfigService } from "./action.config.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("ActionConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: ActionConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        ActionConfigService,
      ],
    }).compile();
    service = module.get<ActionConfigService>(ActionConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("servicePort should be equal to a value", () => {
    expect(service.servicePort).toEqual(0);
  });

  it("serviceRetryAttempts should be equal to a value", () => {
    expect(service.serviceRetryAttempts).toEqual(0);
  });

  it("serviceRetryDelay should be equal to a value", () => {
    expect(service.serviceRetryDelay).toEqual(0);
  });

  it("serviceUrl should be equal to a value", () => {
    expect(service.serviceUrl).toEqual("");
  });
});
