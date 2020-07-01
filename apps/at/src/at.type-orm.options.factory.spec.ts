import { AtConfigService } from "./at.config.service";
import { AtConfigServiceInterface } from "./at.config.service.interface";
import { AtEntity } from "./at.entity";
import { AtTypeOrmOptionsFactory } from "./at.type-orm.options.factory";
import { CommonTypeOrmLogger } from "@melo/common";
import { Test } from "@nestjs/testing";

describe("AtTypeOrmOptionsFactory", () => {
  const atConfigServiceMock: AtConfigServiceInterface = {
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

  let service: AtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: AtConfigService, useValue: atConfigServiceMock }],
    }).compile();
    service = module.get<AtConfigService>(AtConfigService);
  });

  it("should be defined", () => {
    expect(new AtTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      JSON.stringify(
        new AtTypeOrmOptionsFactory(service).createTypeOrmOptions()
      )
    ).toEqual(
      JSON.stringify({
        database: "",
        entities: [AtEntity],
        host: "",
        logger: new CommonTypeOrmLogger(true),
        logging: true,
        name: undefined,
        password: "",
        port: 0,
        synchronize: true,
        type: "mysql",
        username: "",
      })
    );
  });
});
