import { AppUser } from "./app.user.decorator";

describe("AppUser", () => {
  it("should be defined", () => {
    expect(new AppUser()).toBeDefined();
  });
});
