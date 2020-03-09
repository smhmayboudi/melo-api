import { RelationType } from "./relation.type";

describe("RelationType", () => {
  it("should be defined", () => {
    expect(RelationType).toStrictEqual({
      dislikedSongs: "~liked_songs",
      follows: "follows",
      likedSongs: "liked_songs",
      unfollows: "~follows"
    });
  });
});
