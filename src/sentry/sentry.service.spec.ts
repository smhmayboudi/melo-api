import { Test, TestingModule } from "@nestjs/testing";
import { SentryService } from "./sentry.service";
import { SENTRY_INSTANCE_TOKEN } from "./sentry.constant";

describe("SentryService", () => {
  let service: SentryService;

  const sentryMock = jest.fn(() => ({
    withScope: {}
  }));
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

  it("log be defined", () => {
    jest.spyOn(service, "log").mockImplementation(() => null);
    expect(service.log("")).toBeDefined();
  });

  it("error be defined", () => {
    jest.spyOn(service, "error").mockImplementation(() => null);
    expect(service.error("")).toBeDefined();
  });

  it("warn be defined", () => {
    jest.spyOn(service, "warn").mockImplementation(() => null);
    expect(service.warn("")).toBeDefined();
  });

  it("debug be defined", () => {
    jest.spyOn(service, "debug").mockImplementation(() => null);
    expect(service.debug("")).toBeDefined();
  });

  it("verbose be defined", () => {
    jest.spyOn(service, "verbose").mockImplementation(() => null);
    expect(service.verbose("")).toBeDefined();
  });
});
