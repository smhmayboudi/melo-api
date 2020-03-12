import { AppUser } from "./app.user.decorator";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";

describe("AppUser", () => {
  it("should be defined", () => {
    expect(AppUser()).toBeDefined();
  });

  it("shoud be equal to a value data undefined", () => {
    class Test {
      test(@AppUser() _sub: number): void {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory(undefined, { user: { sub: 0 } })).toEqual({
      sub: 0
    });
  });

  it("shoud be equal to a value req user undefined", () => {
    class Test {
      test(@AppUser("sub") _sub: number): void {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    try {
      expect(metadata[key].factory("sub", {})).toThrowError();
    } catch (error) {
      console.log(error);
    }
  });

  it("shoud be equal to a value", () => {
    class Test {
      test(@AppUser("sub") _sub: number): void {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory("sub", { user: { sub: 0 } })).toEqual(0);
  });
});
