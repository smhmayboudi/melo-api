import AppApmLogger from "./app.apm.logger";

describe("AppApmLogger", () => {
  it("fatal should be undefined", () => {
    expect(AppApmLogger.fatal("")).toBeUndefined();
  });

  it("error should be undefined", () => {
    expect(AppApmLogger.error("")).toBeUndefined();
  });

  it("warn should be undefined", () => {
    expect(AppApmLogger.warn("")).toBeUndefined();
  });

  it("info should be undefined", () => {
    expect(AppApmLogger.info("")).toBeUndefined();
  });

  it("debug should be undefined", () => {
    expect(AppApmLogger.debug("")).toBeUndefined();
  });

  it("trace should be undefined", () => {
    expect(AppApmLogger.trace("")).toBeUndefined();
  });
});
