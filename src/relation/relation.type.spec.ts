import { RelationType } from "./relation.type";

describe("RelationType", () => {
  it("should equal to relation type", () => {
    expect(RelationType).toStrictEqual({
      dislikedSongs: "~liked_songs",
      follows: "follows",
      likedSongs: "liked_songs",
      unfollows: "~follows"
    });
  });
});
