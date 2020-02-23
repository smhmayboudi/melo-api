import { Test, TestingModule } from "@nestjs/testing";
import { PromInterceptor } from "./prom.interceptor";
import { PromService } from "./prom.service";

describe("PromInterceptor", () => {
  let service: PromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PromService]
    }).compile();

    service = module.get<PromService>(PromService);
  });

  it("should be defined", () => {
    expect(new PromInterceptor(service)).toBeDefined();
  });
});
