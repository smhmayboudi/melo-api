import { ConfigService } from "@nestjs/config";
import { SearchConfigService } from "./search.config.service";
import { Test } from "@nestjs/testing";

describe("SearchConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: SearchConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<SearchConfigService>(SearchConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("elasticsearchNode should be equal to a value", () => {
    expect(service.elasticsearchNode).toEqual("");
  });

  it("indexName should be equal to a value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should be equal to a value", () => {
    expect(service.maxSize).toEqual(0);
  });

  it("scriptScore should be equal to a value", () => {
    expect(service.scriptScore).toEqual("");
  });

  it("suggestIndex should be equal to a value", () => {
    expect(service.suggestIndex).toEqual("");
  });
});
