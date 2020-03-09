import { Test, TestingModule } from "@nestjs/testing";
import * as Sentry from "@sentry/node";
import {
  SENTRY_INSTANCE_TOKEN,
  SENTRY_MODULE_OPTIONS
} from "./sentry.constant";
import { SentryInterceptor } from "./sentry.interceptor";
import { SentryModuleOptions } from "./sentry.module.interface";

describe("SentryInterceptor", () => {
  // TODO: interface ?
  const sentryMock = {
    withScope: {}
  };

  // TODO: interface ?
  const optionsMock: SentryModuleOptions = {};

  let sentry: typeof Sentry;
  let options: SentryModuleOptions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SENTRY_INSTANCE_TOKEN,
          useValue: sentryMock
        },
        {
          provide: SENTRY_MODULE_OPTIONS,
          useValue: optionsMock
        }
      ]
    }).compile();
    sentry = module.get<typeof Sentry>(SENTRY_MODULE_OPTIONS);
    options = module.get<SentryModuleOptions>(SENTRY_MODULE_OPTIONS);
  });

  it("should be defined", () => {
    expect(new SentryInterceptor(options, sentry)).toBeDefined();
  });
});
