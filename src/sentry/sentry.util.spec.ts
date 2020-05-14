// import * as Sentry from "@sentry/node";

import { getOrCreateSentryInstance, makeDefaultOptions } from "./sentry.util";

describe("SentryUtil", () => {
  it("getOrCreateSentryInstance should be defined", () => {
    expect(getOrCreateSentryInstance({}, true)).toBeDefined();
  });

  it("getOrCreateSentryInstance should be defined with debug true", () => {
    expect(getOrCreateSentryInstance({ debug: true }, true)).toBeDefined();
  });

  it("getOrCreateSentryInstance should be defined 2", () => {
    expect(getOrCreateSentryInstance({}, false)).toBeDefined();
  });

  it.todo("getOrCreateSentryInstance integrations");

  it("makeDefaultOptions should be equal to an option", () => {
    expect(makeDefaultOptions({})).toEqual({});
  });
});
