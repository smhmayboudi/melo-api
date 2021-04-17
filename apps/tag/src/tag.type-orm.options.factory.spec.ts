import { CommonTypeOrmLogger } from "@melo/common";
import { TagConfigService } from "./tag.config.service";
import { TagConfigServiceInterface } from "./tag.config.service.interface";
import { TagEntity } from "./tag.entity";
import { TagRelationEntity } from "./tag-relation.entity";
import { TagTypeOrmOptionsFactory } from "./tag.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("TagTypeOrmOptionsFactory", () => {
  const tagConfigServiceMock: TagConfigServiceInterface = {
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

  let service: TagConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: TagConfigService, useValue: tagConfigServiceMock },
      ],
    }).compile();
    service = module.get<TagConfigService>(TagConfigService);
  });

  it("should be defined", () => {
    expect(new TagTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect(
      JSON.stringify(
        new TagTypeOrmOptionsFactory(service).createTypeOrmOptions()
      )
    ).toEqual(
      JSON.stringify({
        database: "",
        entities: [TagEntity, TagRelationEntity],
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
