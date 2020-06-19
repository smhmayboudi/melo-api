import { RelationConfigService } from "./relation.config.service";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import { RelationDgraphOptionsFactory } from "./relation.dgraph.options.factory";
import { Test } from "@nestjs/testing";

describe("RelationDgraphOptionsFactory", () => {
  const relationConfigServiceMock: RelationConfigServiceInterface = {
    dgraphAddress: "",
    dgraphDebug: true,
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
  };

  let service: RelationConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: RelationConfigService, useValue: relationConfigServiceMock },
      ],
    }).compile();
    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(new RelationDgraphOptionsFactory(service)).toBeDefined();
  });

  it("createDgraphOptions should be equal to a value", () => {
    expect(
      new RelationDgraphOptionsFactory(service).createDgraphOptions()
    ).toEqual({
      debug: true,
      stubs: [
        {
          address: "",
        },
      ],
    });
  });
});
