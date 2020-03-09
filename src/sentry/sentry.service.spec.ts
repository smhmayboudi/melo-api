import { Test, TestingModule } from "@nestjs/testing";
import { SentryService } from "./sentry.service";
import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";

describe("SentryService", () => {
  // TODO: interface ?
  const sentryMock = {
    captureMessage: jest.fn()
  };

  let service: SentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentryService,
        {
          provide: SENTRY_INSTANCE_TOKEN,
          useValue: sentryMock
        }
      ]
    }).compile();
    service = module.get<SentryService>(SentryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("log be called", () => {
    service.log("");
    expect(sentryMock.captureMessage).toBeCalled();
  });

  it("error be called", () => {
    service.error("");
    expect(sentryMock.captureMessage).toBeCalled();
  });

  it("warn be called", () => {
    service.warn("");
    expect(sentryMock.captureMessage).toBeCalled();
  });

  it("debug be called", () => {
    service.debug("");
    expect(sentryMock.captureMessage).toBeCalled();
  });

  it("verbose be called", () => {
    service.verbose("");
    expect(sentryMock.captureMessage).toBeCalled();
  });
});
