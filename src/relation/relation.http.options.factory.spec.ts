import { HttpModuleOptions } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RelationConfigService } from "./relation.config.service";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import { RelationHttpOptionsFactory } from "./relation.http.options.factory";

describe("RelationHttpOptionsFactory", () => {
  const httpModuleOptions: HttpModuleOptions = {
    timeout: 0
  };
  const relationConfigServiceMock: RelationConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
  let service: RelationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RelationConfigService, useValue: relationConfigServiceMock }
      ]
    }).compile();
    service = module.get<RelationConfigService>(RelationConfigService);
  });

  it("should be defined", () => {
    expect(new RelationHttpOptionsFactory(service)).toBeDefined();
  });

  it("createHttpOptions should return an option", () => {
    expect(new RelationHttpOptionsFactory(service).createHttpOptions()).toEqual(
      httpModuleOptions
    );
  });
});
