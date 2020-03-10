import { Test, TestingModule } from "@nestjs/testing";
import { SentryService } from "./sentry.service";
import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";

describe("SentryService", () => {
  // TODO: interface ?
  const sentryMock: any = {
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
    sentryMock.captureMessage.mockReset();
  });

  it("error be called", () => {
    service.error("");
    expect(sentryMock.captureMessage).toBeCalled();
    sentryMock.captureMessage.mockReset();
  });

  it("warn be called", () => {
    service.warn("");
    expect(sentryMock.captureMessage).toBeCalled();
    sentryMock.captureMessage.mockReset();
  });

  it("debug be called", () => {
    service.debug("");
    expect(sentryMock.captureMessage).toBeCalled();
    sentryMock.captureMessage.mockReset();
  });

  it("verbose be called", () => {
    service.verbose("");
    expect(sentryMock.captureMessage).toBeCalled();
    sentryMock.captureMessage.mockReset();
  });

  describe("exception", () => {
    // TODO: interface ?
    const sentryMock: any = {
      // captureMessage: () => {
      //   throw new Error("");
      // }
      captureMessage: () => {
        throw new Error("");
      }
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
      expect(service.log("")).toBeUndefined();
    });

    it("error be called", () => {
      expect(service.error("")).toBeUndefined();
    });

    it("warn be called", () => {
      expect(service.warn("")).toBeUndefined();
    });

    it("debug be called", () => {
      expect(service.debug("")).toBeUndefined();
    });

    it("verbose be called", () => {
      expect(service.verbose("")).toBeUndefined();
    });
  });
});
