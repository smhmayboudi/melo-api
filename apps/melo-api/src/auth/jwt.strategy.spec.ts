import {
  AtResDto,
  AuthJwtPayloadReqDto,
  JwksResDto,
  RtResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

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
    delete: (): Promise<AtResDto | undefined> => Promise.resolve(atEntity),
    deleteByToken: (): Promise<AtResDto | undefined> =>
      Promise.resolve(atEntity),
    find: (): Promise<AtResDto[]> => Promise.resolve([atEntity]),
    findOne: (): Promise<AtResDto | undefined> => Promise.resolve(atEntity),
    findOneByToken: (): Promise<AtResDto | undefined> =>
      Promise.resolve(atEntity),
    save: (): Promise<AtResDto> => Promise.resolve(atEntity),
    update: (): Promise<AtResDto | undefined> => Promise.resolve(atEntity),
    validate: (): Promise<AtResDto | undefined> => Promise.resolve(atEntity),
    validateByToken: (): Promise<AtResDto | undefined> =>
      Promise.resolve(atEntity),
  };
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 1,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: (): Promise<JwksResDto | undefined> => Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksResDto | undefined> =>
      Promise.resolve(jwksEntity),
  };
  const rtServiceMock: RtServiceInterface = {
    block: (): Promise<RtResDto> => Promise.resolve(rt),
    blockByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    delete: (): Promise<RtResDto> => Promise.resolve(rt),
    deleteByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    find: (): Promise<RtResDto[]> => Promise.resolve([rt]),
    findOne: (): Promise<RtResDto> => Promise.resolve(rt),
    findOneByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    save: (): Promise<RtResDto> => Promise.resolve(rt),
    validate: (): Promise<RtResDto> => Promise.resolve(rt),
    validateByToken: (): Promise<RtResDto> => Promise.resolve(rt),
  };

  let atService: AtService;
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;
  let rtService: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      validate: (): Promise<RtResDto | undefined> => Promise.resolve(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
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

    const module: TestingModule = await Test.createTestingModule({
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
      validateByToken: (): Promise<AtResDto | undefined> =>
        Promise.resolve(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
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
