import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwksService } from "../jwks/jwks.service";
import { RtService } from "../rt/rt.service";
import { AppModule } from "../app/app.module";
import config from "./auth.config";
import { AuthConfigService } from "./auth.config.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  const jwksServiceMock = jest.fn(() => ({
    getOneRandom: {
      id: "",
      public_key: "",
      private_key: ""
    }
  }));
  const jwtServiceMock = jest.fn(() => ({
    sign: ""
  }));
  const rtServiceMock = jest.fn(() => ({
    save: [
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
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        AuthConfigService,
        AuthService,
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
      at: ""
    };
    jest
      .spyOn(service, "accessToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.accessToken(0)).toBe(res);
  });

  it("refreshToken should be defined", async () => {
    const res = {
      at: "",
      rt: ""
    };
    jest
      .spyOn(service, "refreshToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.refreshToken(0)).toBe(res);
  });
});
