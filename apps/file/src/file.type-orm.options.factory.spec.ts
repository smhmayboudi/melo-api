import { CommonTypeOrmLogger } from "@melo/common";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileEntity } from "./file.entity";
import { FileTypeOrmOptionsFactory } from "./file.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("FileTypeOrmOptionsFactory", () => {
  const fileConfigServiceMock: FileConfigServiceInterface = {
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: FileConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: FileConfigService, useValue: fileConfigServiceMock },
      ],
    }).compile();
    service = module.get<FileConfigService>(FileConfigService);
  });

  it("should be defined", () => {
    expect(new FileTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      new FileTypeOrmOptionsFactory(service).createTypeOrmOptions()
    ).toEqual({
      database: "",
      entities: [FileEntity],
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
