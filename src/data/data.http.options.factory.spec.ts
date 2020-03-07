import { HttpModuleOptions } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataHttpOptionsFactory } from "./data.http.options.factory";

describe("DataHttpOptionsFactory", () => {
  const httpModuleOptions: HttpModuleOptions = {
    timeout: 0,
    url: ""
  };

  let dataConfigService: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [DataConfigService]
    }).compile();
    dataConfigService = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(new DataHttpOptionsFactory(dataConfigService)).toBeDefined();
  });

  it("createHttpOptions should be defined", () => {
    expect(
      new DataHttpOptionsFactory(dataConfigService).createHttpOptions()
    ).toEqual(httpModuleOptions);
  });
});
