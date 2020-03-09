import { PromMetricType } from "./prom.metric.type";

describe("PromMetricType", () => {
  it("should be defined", () => {
    expect(PromMetricType).toStrictEqual({
      counter: "counter",
      gauge: "gauge",
      histogram: "histogram",
      summary: "summary"
    });
  });
});
