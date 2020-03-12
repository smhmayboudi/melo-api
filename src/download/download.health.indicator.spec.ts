import { DownloadHealthIndicator } from "./download.health.indicator";

describe("DownloadHealthIndicator", () => {
  it("should be defined", () => {
    expect(new DownloadHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new DownloadHealthIndicator().isHealthy()).toEqual({
      download: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
