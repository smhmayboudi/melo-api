import { Test, TestingModule } from "@nestjs/testing";
import { Counter } from "prom-client";
import { HTTP_REQUESTS_TOTAL } from "./prom.constant";
import { PromInterceptor } from "./prom.interceptor";
import { getTokenCounter } from "./prom.utils";

describe("PromInterceptor", () => {
  let counter: Counter<string>;

  const counterMock = jest.fn(() => ({
    inc: {}
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getTokenCounter(HTTP_REQUESTS_TOTAL), useValue: counterMock }
      ]
    }).compile();

    counter = module.get<Counter<string>>(getTokenCounter(HTTP_REQUESTS_TOTAL));
  });

  it("should be defined", () => {
    expect(new PromInterceptor(counter)).toBeDefined();
  });
});
