import { ActionType } from "./action.type";

describe("ActionType", () => {
  it("should be equal to action type", () => {
    expect(ActionType).toStrictEqual({
      likeSong: "likeSong",
      nextSong: "nextSong",
      pauseSong: "pauseSong",
      playSong: "playSong",
      previousSong: "previousSong",
      seekSong: "seekSong",
    });
  });
});
