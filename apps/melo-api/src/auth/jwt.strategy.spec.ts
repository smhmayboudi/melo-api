import {
  AtResDto,
  AuthJwtPayloadReqDto,
  JwksResDto,
  RtResDto,
} from "@melo/common";

import { AtService } from "../at/at.service";
import { AtServiceInterface } from "../at/at.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { JwtStrategy } from "./jwt.strategy";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";

describe("JwtStrategy", () => {
  const date = new Date();
  const at: AtResDto = {
    count: 0,
    created_at: date,
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    token: "",
    user_id: 0,
  };
  const jwks: JwksResDto = {
    id: "",
    private_key: "",
    public_key: "",
  };
  const rt: RtResDto = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };

  const atServiceMock: AtServiceInterface = {
    delete: () => Promise.resolve(at),
    deleteByToken: () => Promise.resolve(at),
    find: () => Promise.resolve([at]),
    findOne: () => Promise.resolve(at),
    findOneByToken: () => Promise.resolve(at),
    save: () => Promise.resolve(at),
    update: () => Promise.resolve(at),
    validate: () => Promise.resolve(at),
    validateByToken: () => Promise.resolve(at),
  };
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: () => Promise.resolve(jwks),
    getOneRandom: () => Promise.resolve(jwks),
  };
  const rtServiceMock: RtServiceInterface = {
    block: () => Promise.resolve(rt),
    blockByToken: () => Promise.resolve(rt),
    delete: () => Promise.resolve(rt),
    deleteByToken: () => Promise.resolve(rt),
    find: () => Promise.resolve([rt]),
    findOne: () => Promise.resolve(rt),
    findOneByToken: () => Promise.resolve(rt),
    save: () => Promise.resolve(rt),
    validate: () => Promise.resolve(rt),
    validateByToken: () => Promise.resolve(rt),
  };

  let atService: AtService;
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;
  let rtService: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AtService, useValue: atServiceMock },
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(
      new JwtStrategy(atService, authConfigService, jwksService, rtService)
    ).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    const authConfigServiceMockJwtAccessTokenExpiresCount: AuthConfigServiceInterface = {
      ...authConfigServiceMock,
      jwtAccessTokenExpiresCount: 1,
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtService,
          useValue: atServiceMock,
        },
        {
          provide: AuthConfigService,
          useValue: authConfigServiceMockJwtAccessTokenExpiresCount,
        },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    expect(
      await new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).toEqual({
      sub: "",
    });
  });

  it("validate should throw an error", async () => {
    const rtServiceMockValidate: RtServiceInterface = {
      ...rtServiceMock,
      validate: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: AtService, useValue: atServiceMock },
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMockValidate },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    return expect(
      new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).rejects.toThrowError();
  });

  it("validate should throw an error 2", async () => {
    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    return expect(
      new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).rejects.toThrowError();
  });

  it("validate should throw an error 3", async () => {
    const atServiceMockValidateByToken: AtServiceInterface = {
      ...atServiceMock,
      validateByToken: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtService,
          useValue: atServiceMockValidateByToken,
        },
        {
          provide: AuthConfigService,
          useValue: authConfigServiceMock,
        },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    expect(
      await new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).toEqual({
      sub: "",
    });
  });
});
