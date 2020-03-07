import { ActionType } from "./action.type";

describe("ActionType", () => {
  it("should be defined", () => {
    expect(ActionType).toStrictEqual({
      seekSong: "seekSong",
      likeSong: "likeSong",
      playSong: "playSong",
      pauseSong: "pauseSong",
      nextSong: "nextSong",
      previousSong: "previousSong"
    });
  });
});
