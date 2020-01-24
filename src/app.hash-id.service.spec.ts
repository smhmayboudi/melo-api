import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "./app.hash-id.service";

describe("AppHashIdService", () => {
  let service: AppHashIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppHashIdService]
    }).compile();

    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("decode");
  test.todo("encode");
});
