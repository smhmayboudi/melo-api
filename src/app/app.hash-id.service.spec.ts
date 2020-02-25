import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./app.config";
import { AppConfigService } from "./app.config.service";
import { AppHashIdService } from "./app.hash-id.service";

describe("AppHashIdService", () => {
  let service: AppHashIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ConfigModule.forFeature(config)],
      providers: [AppConfigService, AppHashIdService]
    }).compile();

    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("decode should be defined", () => {
    jest.spyOn(service, "decode").mockImplementation(() => 0);
    expect(service.decode("")).toBeDefined();
  });

  it("encode should be defined", () => {
    jest.spyOn(service, "encode").mockImplementation(() => "");
    expect(service.encode(0)).toBeDefined();
  });
});
