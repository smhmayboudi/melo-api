import { PlaylistHealthIndicator } from "./playlist.health.indicator";

describe("PlaylistHealthIndicator", () => {
  it("should be defined", () => {
    expect(new PlaylistHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new PlaylistHealthIndicator().isHealthy()).toEqual({
      playlist: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
