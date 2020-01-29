import { Test, TestingModule } from "@nestjs/testing";
import { AppQueryStringService } from "./app.query-string.service";

describe("AppQueryStringService", () => {
  let service: AppQueryStringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppQueryStringService]
    }).compile();

    service = module.get<AppQueryStringService>(AppQueryStringService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
