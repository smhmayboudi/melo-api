import { AlbumHealthIndicator } from "./album.health.indicator";

describe("AlbumHealthIndicator", () => {
  it("should be defined", () => {
    expect(new AlbumHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new AlbumHealthIndicator().isHealthy()).toEqual({
      album: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
