import { MongooseModuleOptions } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "./app.config.service";
import { AppMongooseOptionsFactory } from "./app.mongoose.options.factory";

describe("AppMongooseOptionsFactory", () => {
  // TODO interface ?
  const appConfigServiceMock = {
    mangooseRetryAttempts: 0,
    mangooseRetryDelay: 0,
    mangooseUri: ""
  };
  const options: MongooseModuleOptions = {
    retryAttempts: appConfigServiceMock.mangooseRetryAttempts,
    retryDelay: appConfigServiceMock.mangooseRetryDelay,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    uri: appConfigServiceMock.mangooseUri
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AppConfigService, useValue: appConfigServiceMock }]
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect(new AppMongooseOptionsFactory(service)).toBeDefined();
  });

  it("createMongooseOptions should be equal to a value", () => {
    expect(
      new AppMongooseOptionsFactory(service).createMongooseOptions()
    ).toEqual(options);
  });
});
