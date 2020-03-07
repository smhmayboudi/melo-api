import { PlaylistHealthIndicator } from "./playlist.health.indicator";

describe("PlaylistHealthIndicator", () => {
  it("should be defined", () => {
    expect(new PlaylistHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new PlaylistHealthIndicator().isHealthy()).toEqual({
      action: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
