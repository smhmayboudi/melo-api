import { CommonTypeOrmLogger } from "@melo/common";
import { FileConfigService } from "./file.config.service";
import { FileConfigServiceInterface } from "./file.config.service.interface";
import { FileEntity } from "./file.entity";
import { FileTypeOrmOptionsFactory } from "./file.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("FileTypeOrmOptionsFactory", () => {
  const fileConfigServiceMock: FileConfigServiceInterface = {
    s3AccessKeyId: "minioadmin",
    s3Bucket: "misc",
    s3Endpoint: "localhost:9000",
    s3ForcePathStyle: false,
    s3SecretAccessKey: "minioadmin",
    s3SslEnabled: false,
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
      JSON.stringify(
        new FileTypeOrmOptionsFactory(service).createTypeOrmOptions()
      )
    ).toEqual(
      JSON.stringify({
        database: "",
        entities: [FileEntity],
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
