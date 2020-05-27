import { Counter, Gauge, Histogram, Registry, Summary } from "prom-client";
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
  promRegistryProviderImp,
} from "./prom.util";

describe("PromUtil", () => {
  it("getOrCreateCounter should be instance of a counter metric", () => {
    expect(
      getOrCreateCounter({ help: "counter", name: "counter" })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateCounter should be instance of same counter metric", () => {
    expect(
      getOrCreateCounter({ help: "counter", name: "counter" })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateGauge should be instance of a gauge metric", () => {
    expect(getOrCreateGauge({ help: "gauge", name: "gauge" })).toBeInstanceOf(
      Gauge
    );
  });

  it("getOrCreateHistogram should be instance of a histogram metric", () => {
    expect(
      getOrCreateHistogram({ help: "histogram", name: "histogram" })
    ).toBeInstanceOf(Histogram);
  });

  it("getOrCreateSummary should be instance of a summary metric", () => {
    expect(
      getOrCreateSummary({ help: "summary", name: "summary" })
    ).toBeInstanceOf(Summary);
  });

  it("getTokenCounter should be equal to a string", () => {
    expect(getTokenCounter("test")).toEqual("PROM_COUNTER_TEST");
  });

  it("getTokenGauge should be equal to a string", () => {
    expect(getTokenGauge("test")).toEqual("PROM_GAUGE_TEST");
  });

  it("getTokenHistogram should be equal to a string", () => {
    expect(getTokenHistogram("test")).toEqual("PROM_HISTOGRAM_TEST");
  });

  it("getTokenSummary should be equal to a string", () => {
    expect(getTokenSummary("test")).toEqual("PROM_SUMMARY_TEST");
  });

  it("getTokenConfiguration should be equal to a string", () => {
    expect(getTokenConfiguration()).toEqual("PROM_CONFIGURATION_DEFAULT");
  });

  it("getTokenConfiguration should be equal to a string with name", () => {
    expect(getTokenConfiguration("TEST")).toEqual("PROM_CONFIGURATION_TEST");
  });

  it("getTokenRegistry should be equal to a string", () => {
    expect(getTokenRegistry()).toEqual("PROM_REGISTRY_DEFAULT");
  });

  it("getTokenRegistry should be equal to a string with name", () => {
    expect(getTokenRegistry("TEST")).toEqual("PROM_REGISTRY_TEST");
  });

  it("makeDefaultOptions should be equal to an option", () => {
    expect(makeDefaultOptions()).toEqual({
      defaultLabels: {},
      defaultMetrics: {
        config: {},
        enabled: true,
      },
      ignorePaths: ["/metrics"],
      path: "/metrics",
      prefix: "",
      registryName: undefined,
    });
  });

  it("makeDefaultOptions should be equal to an option with custom", () => {
    expect(
      makeDefaultOptions({
        defaultLabels: {
          test: "test",
        },
        defaultMetrics: {
          config: {
            eventLoopMonitoringPrecision: 1,
          },
          enabled: false,
        },
        ignorePaths: [],
        path: "",
        prefix: "test",
        registryName: "test",
      })
    ).toEqual({
      defaultLabels: {
        test: "test",
      },
      defaultMetrics: {
        config: {
          eventLoopMonitoringPrecision: 1,
        },
        enabled: false,
      },
      ignorePaths: ["/metrics"],
      path: "",
      prefix: "test",
      registryName: "test",
    });
  });

  it("promConfigurationProviderImp should be undefined", () => {
    expect(promConfigurationProviderImp({}, "")).toBeUndefined();
  });

  it("promConfigurationProviderImp should be undefined with promConfigurationName", () => {
    expect(
      promConfigurationProviderImp({}, "PROM_CONFIGURATION_DEFAULT")
    ).toBeUndefined();
  });

  it("promRegistryProviderImp should be instance of registry", () => {
    expect(promRegistryProviderImp({}, "")).toBeInstanceOf(Registry);
  });

  it("promRegistryProviderImp should be instance of registry with promRegistryName", () => {
    expect(promRegistryProviderImp({}, "PROM_REGISTRY_DEFAULT")).toBeInstanceOf(
      Registry
    );
  });

  it("promRegistryProviderImp should be instance of registry with defaultMetrics", () => {
    expect(
      promRegistryProviderImp(
        {
          defaultMetrics: {
            config: {},
            enabled: true,
          },
        },
        ""
      )
    ).toBeInstanceOf(Registry);
  });
});
