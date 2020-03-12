import { PromMetricType } from "./prom.metric.type";

describe("PromMetricType", () => {
  it("should be equal to prom metric type", () => {
    expect(PromMetricType).toStrictEqual({
      counter: "counter",
      gauge: "gauge",
      histogram: "histogram",
      summary: "summary"
    });
  });
});
