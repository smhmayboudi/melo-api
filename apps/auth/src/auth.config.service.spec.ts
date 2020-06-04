import { AuthConfigService } from "./auth.config.service";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("AuthConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AuthConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("jwtRefreshTokenExpiresIn should be equal to a value", () => {
    expect(service.jwtRefreshTokenExpiresIn).toEqual(0);
  });
});
