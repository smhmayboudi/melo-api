import { SongHealthIndicator } from "./song.health.indicator";

describe("SongHealthIndicator", () => {
  it("should be defined", () => {
    expect(new SongHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new SongHealthIndicator().isHealthy()).toEqual({
      song: {
        status: "up"
      }
    });
  });

  it.todo("isHealthy is false");
});
