import { RelationEntityType } from "./relation.entity.type";

describe("RelationEntityType", () => {
  it("should be equal to relation entity type", () => {
    expect(RelationEntityType).toStrictEqual({
      album: "album",
      artist: "artist",
      playlist: "playlist",
      song: "song",
      user: "user",
    });
  });
});
