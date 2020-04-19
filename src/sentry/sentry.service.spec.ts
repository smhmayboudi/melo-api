import { Test, TestingModule } from "@nestjs/testing";

import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";
import { SentryService } from "./sentry.service";

describe("SentryService", () => {
  // TODO: interface ?
  const sentryMock = {
    captureMessage: jest.fn(),
  };

  let service: SentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentryService,
        {
          provide: SENTRY_INSTANCE_TOKEN,
          useValue: sentryMock,
        },
      ],
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
    const sentryMock = {
      captureMessage: (): void => {
        throw new Error("");
      },
    };

    let service: SentryService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SentryService,
          {
            provide: SENTRY_INSTANCE_TOKEN,
            useValue: sentryMock,
          },
        ],
      }).compile();
      service = module.get<SentryService>(SentryService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("log should be undefined", () => {
      expect(service.log("")).toBeUndefined();
    });

    it("error should be undefined", () => {
      expect(service.error("")).toBeUndefined();
    });

    it("warn should be undefined", () => {
      expect(service.warn("")).toBeUndefined();
    });

    it("debug should be undefined", () => {
      expect(service.debug("")).toBeUndefined();
    });

    it("verbose should be undefined", () => {
      expect(service.verbose("")).toBeUndefined();
    });
  });
});
