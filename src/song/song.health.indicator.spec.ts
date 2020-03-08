import { SongHealthIndicator } from "./song.health.indicator";

describe("SongHealthIndicator", () => {
  it("should be defined", () => {
    expect(new SongHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new SongHealthIndicator().isHealthy()).toEqual({
      song: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
