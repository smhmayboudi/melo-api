import {
  InjectCounter,
  InjectGauge,
  InjectHistogram,
  InjectSummary,
  PromInstanceCounter,
  PromMethodCounter
} from "./prom.decorators";

describe("PromDecorator", () => {
  it("InjectCounter should be defined", () => {
    expect(InjectCounter).toBeDefined();
  });

  it("InjectGauge should be defined", () => {
    expect(InjectGauge).toBeDefined();
  });

  it("InjectHistogram should be defined", () => {
    expect(InjectHistogram).toBeDefined();
  });

  it("InjectSummary should be defined", () => {
    expect(InjectSummary).toBeDefined();
  });

  it("PromInstanceCounter should be defined", () => {
    expect(PromInstanceCounter).toBeDefined();
  });

  it("PromMethodCounter should be defined", () => {
    expect(PromMethodCounter).toBeDefined();
  });
});
