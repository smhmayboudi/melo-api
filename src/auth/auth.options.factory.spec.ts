import { AuthAuthOptionsFactory } from "./auth.options.factory";

describe("AuthAuthOptionsFactory", () => {
  it("should be defined", () => {
    expect(new AuthAuthOptionsFactory()).toBeDefined();
  });

  it("createAuthOptions should be equal to an option", () => {
    expect(new AuthAuthOptionsFactory().createAuthOptions()).toEqual({
      defaultStrategy: "jwt",
      property: "user",
      session: false
    });
  });
});
