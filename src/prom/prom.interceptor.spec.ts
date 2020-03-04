import { Test, TestingModule } from "@nestjs/testing";
import { Counter } from "prom-client";
import {
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS
} from "./prom.constant";
import { PromInterceptor } from "./prom.interceptor";
import { getTokenCounter, getTokenConfiguration } from "./prom.util";
import { PromModuleOptions } from "./prom.module.interface";

describe("PromInterceptor", () => {
  let counter: Counter<string>;
  let options: PromModuleOptions;

  const counterMock = jest.fn(() => ({
    inc: {}
  }));

  const optionsMock = jest.fn(() => ({
    ignorePaths: {}
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL),
          useValue: counterMock
        },
        {
          provide: getTokenConfiguration(PROM_MODULE_OPTIONS),
          useValue: optionsMock
        }
      ]
    }).compile();
    counter = module.get<Counter<string>>(
      getTokenCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
    );
    options = module.get<PromModuleOptions>(
      getTokenConfiguration(PROM_MODULE_OPTIONS)
    );
  });

  it("should be defined", () => {
    expect(new PromInterceptor(counter, options)).toBeDefined();
  });
});
