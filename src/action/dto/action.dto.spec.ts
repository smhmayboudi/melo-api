import { ActionType } from "../action.type";
import { ActionDto } from "./action.dto";

describe("ActionConfig", () => {
  it("should be defined", () => {
    expect(
      new ActionDto(new Date().toString(), ActionType.likeSong)
    ).toBeDefined();
  });
});
