import { Strategy } from "./anonym.strategy";

describe("Strategy", () => {
  const error = jest.fn();
  const success = jest.fn();
  const verifiedCallback = (err: Error, user: any, info: any): void => {
    if (err) {
      return error(err);
    }
    return success(user, info);
  };

  it("should be defined", () => {
    expect(new Strategy(() => verifiedCallback)).toBeDefined();
  });
  it("should be defined 2", () => {
    expect(
      new Strategy({ passReqToCallback: false }, () => verifiedCallback)
    ).toBeDefined();
  });
  it.todo("should be defined 3");
  // it("should be defined 3", () => {
  //   return expect(
  //     new Strategy(
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //       // @ts-ignore
  //       undefined
  //     )
  //   ).rejects.toThrowError();
  // });

  it.todo("authenticate");
  it.todo("authenticate with error");
  it.todo("authenticate with passReqToCallback");
  it.todo("authenticate throw an error");
});
