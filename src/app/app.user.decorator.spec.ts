import { AppUser } from "./app.user.decorator";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";

describe("AppUser", () => {
  it("should be defined", () => {
    expect(AppUser()).toBeDefined();
  });

  it("shoud be equal to a value", () => {
    class Test {
      test(@AppUser() _user: { sub: 0 }): void {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    console.log("LOGLOG", metadata[key].factory());

    expect(metadata[key].factory()).toEqual(null);
  });
});
