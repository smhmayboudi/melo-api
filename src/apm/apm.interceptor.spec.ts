import { Test, TestingModule } from "@nestjs/testing";
import { ApmInterceptor } from "./apm.interceptor";
import { ApmService } from "./apm.service";

describe("ApmInterceptor", () => {
  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApmService]
    }).compile();

    service = module.get<ApmService>(ApmService);
  });

  it("should be defined", () => {
    expect(new ApmInterceptor(service)).toBeDefined();
  });
});
