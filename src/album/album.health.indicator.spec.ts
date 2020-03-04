import { AlbumHealthIndicator } from "./album.health.indicator";

describe("AlbumHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AlbumHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new AlbumHealthIndicator().isHealthy()).toBeDefined();
  });
});
