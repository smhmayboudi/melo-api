import { ArtistHealthIndicator } from "./artist.health.indicator";

describe("ArtistHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ArtistHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new ArtistHealthIndicator().isHealthy()).toEqual({
      artist: {
        message: "OK",
        status: "up",
        statusCode: 200
      }
    });
  });

  it.todo("isHealthy is false");
});
