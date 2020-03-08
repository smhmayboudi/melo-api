import { PromMetricType } from "./prom.metric.type";

describe("PromMetricType", () => {
  it("should be defined", () => {
    expect(PromMetricType).toStrictEqual({
      Counter: "Counter",
      Gauge: "Gauge",
      Histogram: "Histogram",
      Summary: "Summary"
    });
  });
});
