import { getOrCreateSentryInstance, makeDefaultOptions } from "./sentry.util";

describe("SentryUtil", () => {
  it("getOrCreateSentryInstance should be defined", () => {
    expect(getOrCreateSentryInstance({}, true)).toBeDefined();
  });

  it("getOrCreateSentryInstance should be defined debug: true", () => {
    expect(getOrCreateSentryInstance({ debug: true }, true)).toBeDefined();
  });

  it("getOrCreateSentryInstance should equal same instance", () => {
    expect(getOrCreateSentryInstance({}, false)).toBeDefined();
  });

  it("makeDefaultOptions should equal to an option", () => {
    expect(makeDefaultOptions({})).toEqual({});
  });
});
