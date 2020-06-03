import { CommonTypeOrmLogger } from "@melo/common";
import { Test } from "@nestjs/testing";
import { UserConfigService } from "./user.config.service";
import { UserConfigServiceInterface } from "./user.config.service.interface";
import { UserEntity } from "./user.entity";
import { UserTypeOrmOptionsFactory } from "./user.type-orm.options.factory";

describe("UserTypeOrmOptionsFactory", () => {
  const userConfigServiceMock: UserConfigServiceInterface = {
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: UserConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: UserConfigService, useValue: userConfigServiceMock },
      ],
    }).compile();
    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect(new UserTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new UserTypeOrmOptionsFactory(service).createTypeOrmOptions()
    ).toEqual({
      database: "",
      entities: [UserEntity],
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
