import { RelationEdgeType } from "./relation.edge.type";

describe("RelationEdgeType", () => {
  it("should be equal to relation type", () => {
    expect(RelationEdgeType).toStrictEqual({
      follows: "follows",
      likedSongs: "liked_songs",
      reverseFollows: "~follows",
      reverseLikedSongs: "~liked_songs",
    });
  });
});
