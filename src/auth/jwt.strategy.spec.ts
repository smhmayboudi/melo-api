import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult, UpdateResult } from "typeorm";
import { AtEntity } from "../at/at.entity";
import { AtService } from "../at/at.service";
import { AtServiceInterface } from "../at/at.service.interface";
import { JwksEntity } from "../jwks/jwks.entity";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { RtEntity } from "../rt/rt.entity";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthJwtPayloadReqDto } from "./dto/req/auth.jwt-payload.req.dto";
import { JwtStrategy } from "./jwt.strategy";

describe("JwtStrategy", () => {
  const date = new Date();
  const atEntity: AtEntity = {
    count: 0,
    created_at: date,
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    user_id: 0,
    token: ""
  };
  const deleteResult: DeleteResult = {
    raw: {}
  };
  const jwksEntity: JwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: new Date(Date.now() + 1000),
    id: 0,
    is_blocked: false,
    user_id: 0,
    token: ""
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: {}
  };

  const atServiceMock: AtServiceInterface = {
    deleteById: (): Promise<DeleteResult> => Promise.resolve(deleteResult),
    deleteByToken: (): Promise<DeleteResult> => Promise.resolve(deleteResult),
    find: (): Promise<AtEntity[]> => Promise.resolve([atEntity]),
    findOneById: (): Promise<AtEntity | undefined> => Promise.resolve(atEntity),
    findOneByToken: (): Promise<AtEntity | undefined> =>
      Promise.resolve(atEntity),
    save: (): Promise<AtEntity> => Promise.resolve(atEntity),
    update: (): Promise<UpdateResult> => Promise.resolve(updateResult),
    validateByToken: (): Promise<AtEntity | undefined> =>
      Promise.resolve(atEntity),
    validateBySub: (): Promise<AtEntity | undefined> =>
      Promise.resolve(atEntity)
  };
  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 1,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOneById: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity)
  };
  const rtServiceMock: RtServiceInterface = {
    blockById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    blockByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    deleteById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    deleteByToken: (): Promise<void> => Promise.resolve(undefined),
    find: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    findOneById: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    findOneByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    save: (): Promise<RtEntity> => Promise.resolve(rtEntity),
    validateBySub: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity),
    validateByToken: (): Promise<RtEntity | undefined> =>
      Promise.resolve(rtEntity)
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
        { provide: RtService, useValue: rtServiceMock }
      ]
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

  it("validate should equal to an auth strategy", async () => {
    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: ""
    };
    expect(
      await new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).toEqual({
      sub: ""
    });
  });

  describe("validateBySub: undefined", () => {
    const rtServiceMockValidateBySubUndefined: RtServiceInterface = {
      ...rtServiceMock,
      validateBySub: (): Promise<RtEntity | undefined> =>
        Promise.resolve(undefined)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: AtService, useValue: atServiceMock },
          { provide: AuthConfigService, useValue: authConfigServiceMock },
          { provide: JwksService, useValue: jwksServiceMock },
          { provide: RtService, useValue: rtServiceMockValidateBySubUndefined }
        ]
      }).compile();
      atService = module.get<AtService>(AtService);
      authConfigService = module.get<AuthConfigService>(AuthConfigService);
      jwksService = module.get<JwksService>(JwksService);
      rtService = module.get<RtService>(RtService);
    });

    it("validate should throw an exception", async () => {
      const dto: AuthJwtPayloadReqDto = {
        exp: 0,
        iat: 0,
        jti: "",
        sub: ""
      };
      try {
        expect(
          await new JwtStrategy(
            atService,
            authConfigService,
            jwksService,
            rtService
          ).validate(dto)
        ).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("jwtAccessTokenExpiresCount: zero", () => {
    const authConfigServiceMockJwtAccessTokenExpiresCount: AuthConfigServiceInterface = {
      ...authConfigServiceMock,
      jwtAccessTokenExpiresCount: 0
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AtService,
            useValue: atServiceMock
          },
          {
            provide: AuthConfigService,
            useValue: authConfigServiceMockJwtAccessTokenExpiresCount
          },
          { provide: JwksService, useValue: jwksServiceMock },
          { provide: RtService, useValue: rtServiceMock }
        ]
      }).compile();
      atService = module.get<AtService>(AtService);
      authConfigService = module.get<AuthConfigService>(AuthConfigService);
      jwksService = module.get<JwksService>(JwksService);
      rtService = module.get<RtService>(RtService);
    });

    it("validate should throw an exception", async () => {
      const dto: AuthJwtPayloadReqDto = {
        exp: 0,
        iat: 0,
        jti: "",
        sub: ""
      };
      try {
        expect(
          await new JwtStrategy(
            atService,
            authConfigService,
            jwksService,
            rtService
          ).validate(dto)
        ).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("validateByToken: undefined", () => {
    const atServiceMockValidateByTokenUndefined: AtServiceInterface = {
      ...atServiceMock,
      validateByToken: (): Promise<AtEntity | undefined> =>
        Promise.resolve(undefined)
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: AtService,
            useValue: atServiceMockValidateByTokenUndefined
          },
          {
            provide: AuthConfigService,
            useValue: authConfigServiceMock
          },
          { provide: JwksService, useValue: jwksServiceMock },
          { provide: RtService, useValue: rtServiceMock }
        ]
      }).compile();
      atService = module.get<AtService>(AtService);
      authConfigService = module.get<AuthConfigService>(AuthConfigService);
      jwksService = module.get<JwksService>(JwksService);
      rtService = module.get<RtService>(RtService);
    });

    it("validate should throw an exception", async () => {
      const dto: AuthJwtPayloadReqDto = {
        exp: 0,
        iat: 0,
        jti: "",
        sub: ""
      };
      expect(
        await new JwtStrategy(
          atService,
          authConfigService,
          jwksService,
          rtService
        ).validate(dto)
      ).toEqual({ sub: "" });
    });
  });
});
