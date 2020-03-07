import { getOrCreateSentryInstance, makeDefaultOptions } from "./sentry.util";

describe("SentryUtil", () => {
  it("getOrCreateSentryInstance should be defined", () => {
    expect(getOrCreateSentryInstance({})).toBeDefined();
  });

  it("makeDefaultOptions should be defined", () => {
    expect(makeDefaultOptions()).toBeDefined();
  });
});
