import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";
import { DataHttpOptionsFactory } from "./data.http.options.factory";
import { DataConfigServiceInterface } from "./data.config.service.interface";

describe("DataHttpOptionsFactory", () => {
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };

  let service: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DataConfigService,
          useValue: dataConfigServiceMock
        }
      ]
    }).compile();
    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(new DataHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should be equal to an option", () => {
    expect(new DataHttpOptionsFactory(service).createHttpOptions()).toEqual({
      timeout: 0
    });
  });
});
