/* eslint-disable @typescript-eslint/no-unused-vars */

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

  it("authenticate", () => {
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
      ) => {}, false).authenticate({
        headers: {
          authorization: "jwt",
        },
      })
    ).toBeUndefined();
  });

  it("authenticate passReqToCallback", () => {
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
      ) => {}, true).authenticate({
        headers: {
          authorization: "jwt",
        },
      })
    ).toBeUndefined();
  });
});
