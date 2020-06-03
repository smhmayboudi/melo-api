import { CommonTypeOrmLogger } from "@melo/common";
import { RtConfigService } from "./rt.config.service";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import { RtEntity } from "./rt.entity";
import { RtTypeOrmOptionsFactory } from "./rt.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("RtTypeOrmOptionsFactory", () => {
  const rtConfigServiceMock: RtConfigServiceInterface = {
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: RtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: RtConfigService, useValue: rtConfigServiceMock }],
    }).compile();
    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect(new RtTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(new RtTypeOrmOptionsFactory(service).createTypeOrmOptions()).toEqual(
      {
        database: "",
        entities: [RtEntity],
        host: "",
        logger: new CommonTypeOrmLogger(true),
        logging: true,
        password: "",
        port: 0,
        synchronize: true,
        type: "mysql",
        username: "",
      }
    );
  });
});
