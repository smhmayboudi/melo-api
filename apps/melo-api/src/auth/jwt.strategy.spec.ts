import { AuthJwtPayloadReqDto, RtResDto } from "@melo/common";

import { AtEntity } from "../at/at.entity";
import { AtService } from "../at/at.service";
import { AtServiceInterface } from "../at/at.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { JwtStrategy } from "./jwt.strategy";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";

describe("JwtStrategy", () => {
  const date = new Date();
  const atEntity: AtEntity = {
    count: 0,
    created_at: date,
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    token: "",
    user_id: 0,
  };
  const jwksEntity: JwksEntity = {
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
    delete: () => Promise.resolve(atEntity),
    deleteByToken: () => Promise.resolve(atEntity),
    find: () => Promise.resolve([atEntity]),
    findOne: () => Promise.resolve(atEntity),
    findOneByToken: () => Promise.resolve(atEntity),
    save: () => Promise.resolve(atEntity),
    update: () => Promise.resolve(atEntity),
    validate: () => Promise.resolve(atEntity),
    validateByToken: () => Promise.resolve(atEntity),
  };
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 1,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: () => Promise.resolve(jwksEntity),
    getOneRandom: () => Promise.resolve(jwksEntity),
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
    const authConfigServiceMockJwtAccessTokenExpiresCount: AuthConfigServiceInterface = {
      ...authConfigServiceMock,
      jwtAccessTokenExpiresCount: 0,
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
