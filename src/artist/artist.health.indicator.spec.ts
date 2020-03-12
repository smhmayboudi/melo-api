import { ArtistHealthIndicator } from "./artist.health.indicator";

describe("ArtistHealthIndicator", () => {
  it("should be defined", () => {
    expect(new ArtistHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect(await new ArtistHealthIndicator().isHealthy()).toEqual({
      artist: {
        status: "up"
      }
    });
  });

  it.todo("isHealthy is false");
});
