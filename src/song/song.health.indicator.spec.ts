import { SongHealthIndicator } from "./song.health.indicator";

describe("SongHealthIndicator", () => {
  it("should be defined", () => {
    expect(new SongHealthIndicator()).toBeDefined();
  });

  it("isHealthy should be defined", () => {
    expect(new SongHealthIndicator().isHealthy()).toBeDefined();
  });
});
