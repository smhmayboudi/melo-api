import { RelationEntityType } from "./relation.entity.type";

describe("RelationEntityType", () => {
  it("should be equal to relation entity type", () => {
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
