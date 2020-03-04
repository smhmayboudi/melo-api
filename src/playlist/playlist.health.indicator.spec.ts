import { PlaylistHealthIndicator } from "./playlist.health.indicator";

describe("PlaylistHealthIndicator", () => {
  it("should be defined", () => {
    expect(new PlaylistHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new PlaylistHealthIndicator().isHealthy()).toBeDefined();
  });
});
