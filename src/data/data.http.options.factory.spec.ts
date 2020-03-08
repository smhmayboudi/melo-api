import { HttpModuleOptions } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";
import { DataHttpOptionsFactory } from "./data.http.options.factory";

describe("DataHttpOptionsFactory", () => {
  const httpModuleOptions: HttpModuleOptions = {
    timeout: 0
  };

  let dataConfigService: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
