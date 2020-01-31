import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppHashIdService } from "./app.hash-id.service";

describe("AppHashIdService", () => {
  let service: AppHashIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService, AppHashIdService]
    }).compile();

    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("decode");
  test.todo("encode");
});
