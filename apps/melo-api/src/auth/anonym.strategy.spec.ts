import { Strategy } from "./anonym.strategy";
import express from "express";

describe("Strategy", () => {
  it("should be defined", () => {
    expect(
      new Strategy((
        _authorization: string | undefined,
        _verified: (
          err: Error | null,
          user?: Record<string, unknown>,
          info?: Record<string, unknown>
        ) => void,
        _req?: express.Request
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      ) => {}, false)
    ).toBeDefined();
  });

  it.todo("authenticate");
});
