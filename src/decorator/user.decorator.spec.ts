import { User } from "./user.decorator";

describe("User", () => {
  it("should be defined", () => {
    expect(new User()).toBeDefined();
  });
});
