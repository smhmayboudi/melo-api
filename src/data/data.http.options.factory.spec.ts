import { HttpModuleOptions } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { DataConfigService } from "./data.config.service";
import { DataHttpOptionsFactory } from "./data.http.options.factory";
import { DataConfigServiceInterface } from "./data.config.service.interface";

describe("DataHttpModuleOptionsFactory", () => {
  const httpModuleOptions: HttpModuleOptions = {
    timeout: 0
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
  let dataConfigService: DataConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataConfigService, useValue: dataConfigServiceMock }
      ]
    }).compile();
    dataConfigService = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(new DataHttpOptionsFactory(dataConfigService)).toBeDefined();
  });

  it("createHttpOptions should be defined", () => {
    console.log(
      "LOG: ",
      new DataHttpOptionsFactory(dataConfigService).createHttpOptions()
    );

    expect(
      new DataHttpOptionsFactory(dataConfigService).createHttpOptions()
    ).toEqual(httpModuleOptions);
  });
});
