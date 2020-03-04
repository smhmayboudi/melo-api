import {
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  getOrCreateSummary,
  getTokenConfiguration,
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenRegistry,
  getTokenSummary,
  makeDefaultOptions,
  promConfigurationProviderImp,
  promRegistryProviderImp
} from "./prom.util";

describe("PromUtil", () => {
  it("getOrCreateCounter should be defined", () => {
    expect(getOrCreateCounter({ name: "name", help: "help" })).toBeDefined();
  });

  it("getOrCreateGauge should be defined", () => {
    expect(getOrCreateGauge({ name: "name", help: "help" })).toBeDefined();
  });

  it("getOrCreateHistogram should be defined", () => {
    expect(getOrCreateHistogram({ name: "name", help: "help" })).toBeDefined();
  });

  it("getOrCreateSummary should be defined", () => {
    expect(getOrCreateSummary({ name: "name", help: "help" })).toBeDefined();
  });

  it("getTokenCounter should be defined", () => {
    expect(getTokenCounter("")).toBeDefined();
  });

  it("getTokenGauge should be defined", () => {
    expect(getTokenGauge("")).toBeDefined();
  });

  it("getTokenHistogram should be defined", () => {
    expect(getTokenHistogram("")).toBeDefined();
  });

  it("getTokenSummary should be defined", () => {
    expect(getTokenSummary("")).toBeDefined();
  });

  it("getTokenConfiguration should be defined", () => {
    expect(getTokenConfiguration()).toBeDefined();
  });

  it("getTokenRegistry should be defined", () => {
    expect(getTokenRegistry("")).toBeDefined();
  });

  it("makeDefaultOptions should be defined", () => {
    expect(makeDefaultOptions()).toBeDefined();
  });

  it("promConfigurationProviderImp should be defined", () => {
    expect(promConfigurationProviderImp({}, "")).toBe(undefined);
  });

  it("promRegistryProviderImp should be defined", () => {
    expect(promRegistryProviderImp({}, "")).toBeDefined();
  });
});
