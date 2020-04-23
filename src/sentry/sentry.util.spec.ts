import * as Sentry from "@sentry/node";

import { getOrCreateSentryInstance, makeDefaultOptions } from "./sentry.util";

describe("SentryUtil", () => {
  it("getOrCreateSentryInstance should be instance of a sentry", () => {
    expect(getOrCreateSentryInstance({}, true)).toBeInstanceOf(typeof Sentry);
  });

  it("getOrCreateSentryInstance should be instance of a sentry with debug true", () => {
    expect(getOrCreateSentryInstance({ debug: true }, true)).toBeInstanceOf(
      typeof Sentry
    );
  });

  it("getOrCreateSentryInstance should be instance of the same sentry", () => {
    expect(getOrCreateSentryInstance({}, false)).toBeInstanceOf(typeof Sentry);
  });

  it.todo("getOrCreateSentryInstance integrations");

  it("makeDefaultOptions should be equal to an option", () => {
    expect(makeDefaultOptions({})).toEqual({});
  });
});
