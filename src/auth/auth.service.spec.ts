import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksService } from "../jwks/jwks.service";
import { RtService } from "../rt/rt.service";
// import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";
import { AuthConfigService } from "./auth.config.service";

describe("AuthService", () => {
  let service: AuthService;

  const authConfigServiceMock = {
    jwtRefreshTokenExpiresIn: (): any => 0
  };
  const jwksServiceMock = {
    getOneRandom: (): any => ({
      id: "",
      public_key: "",
      private_key: ""
    })
  };
  const jwtServiceMock = {
    sign: (): any => 0
  };
  const rtServiceMock = {
    save: (): any => [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ]
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("accessToken should be defined", async () => {
    const res = {
      at: 0
    };
    expect(await service.accessToken(0)).toEqual(res);
  });

  it("refreshToken should be defined", async () => {
    jest.mock("crypto-random-string").fn(() => "");
    const res = {
      at: 0,
      rt: ""
    };
    expect(await service.refreshToken(0)).toEqual(res);
  });
});
