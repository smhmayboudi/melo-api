import { CommonTypeOrmLogger } from "@melo/common";
import { JwksConfigService } from "./jwks.config.service";
import { JwksConfigServiceInterface } from "./jwks.config.service.interface";
import { JwksEntity } from "./jwks.entity";
import { JwksTypeOrmOptionsFactory } from "./jwks.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("JwksTypeOrmOptionsFactory", () => {
  const jwksConfigServiceMock: JwksConfigServiceInterface = {
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: JwksConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: JwksConfigService, useValue: jwksConfigServiceMock },
      ],
    }).compile();
    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect(new JwksTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new JwksTypeOrmOptionsFactory(service).createTypeOrmOptions()
    ).toEqual({
      database: "",
      entities: [JwksEntity],
      host: "",
      logger: new CommonTypeOrmLogger(true),
      logging: true,
      password: "",
      port: 0,
      synchronize: true,
      type: "mysql",
      username: "",
    });
  });
});
