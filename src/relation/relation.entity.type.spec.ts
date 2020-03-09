import { RelationEntityType } from "./relation.entity.type";

describe("RelationEntityType", () => {
  it("should be defined", () => {
    expect(RelationEntityType).toStrictEqual({
      album: "album",
      artist: "artist",
      following: "following",
      playlist: "playlist",
      song: "song",
      user: "user"
    });
  });
});
