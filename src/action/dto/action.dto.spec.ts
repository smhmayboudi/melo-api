import { ActionDto } from "./action.dto";
import { ActionType } from "../action.type";

describe("ActionConfig", () => {
  it("should be defined", () => {
    expect(
      new ActionDto(new Date().toString(), ActionType.likeSong)
    ).toBeDefined();
  });
});
