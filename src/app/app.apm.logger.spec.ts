import AppApmLogger from "./app.apm.logger";

describe("AppApmLogger", () => {
  it("fatal should be not defined", () => {
    expect(AppApmLogger.fatal("")).toBeUndefined();
  });

  it("error should be not defined", () => {
    expect(AppApmLogger.error("")).toBeUndefined();
  });

  it("warn should be not defined", () => {
    expect(AppApmLogger.warn("")).toBeUndefined();
  });

  it("info should be not defined", () => {
    expect(AppApmLogger.info("")).toBeUndefined();
  });

  it("debug should be not defined", () => {
    expect(AppApmLogger.debug("")).toBeUndefined();
  });

  it("trace should be not defined", () => {
    expect(AppApmLogger.trace("")).toBeUndefined();
  });
});
