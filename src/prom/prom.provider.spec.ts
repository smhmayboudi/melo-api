import {
  getOrCreateCounterProvider,
  getOrCreateGaugeProvider,
  getOrCreateHistogramProvider,
  getOrCreateSummaryProvider
} from "./prom.provider";

describe("PromProvider", () => {
  it("getOrCreateCounterProvider should be defined", () => {
    expect(getOrCreateCounterProvider({ name: "", help: "" })).toBeDefined();
  });

  it("getOrCreateGaugeProvider should be defined", () => {
    expect(getOrCreateGaugeProvider({ name: "", help: "" })).toBeDefined();
  });

  it("getOrCreateHistogramProvider should be defined", () => {
    expect(getOrCreateHistogramProvider({ name: "", help: "" })).toBeDefined();
  });

  it("getOrCreateSummaryProvider should be defined", () => {
    expect(getOrCreateSummaryProvider({ name: "", help: "" })).toBeDefined();
  });
});
