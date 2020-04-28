import { Strategy as PassportStrategy } from "passport-strategy";
import express from "express";

export class Strategy extends PassportStrategy {
  name: string;
  verify: (
    authorization: string | undefined,
    verified: (
      err: Error | null,
      user?: Record<string, unknown>,
      info?: Record<string, unknown>
    ) => void,
    req?: express.Request
  ) => void;
  passReqToCallback: boolean;

  constructor(
    verify: (
      authorization: string | undefined,
      verified: (
        err: Error | null,
        user?: Record<string, unknown>,
        info?: Record<string, unknown>
      ) => void,
      req?: express.Request
    ) => void,
    passReqToCallback: boolean
  ) {
    super();
    this.name = "anonymId";
    this.verify = verify;
    this.passReqToCallback = passReqToCallback || false;
  }

  authenticate(req: express.Request, _options?: Record<string, unknown>): void {
    const authorization = req.headers.authorization;
    const verified: (
      err: Error | null,
      user?: Record<string, unknown> | undefined,
      info?: Record<string, unknown> | undefined
    ) => void = (
      err: Error | null,
      user?: Record<string, unknown>,
      info?: Record<string, unknown>
    ) => {
      if (err) {
        return this.error(err);
      }
      this.success(user, info);
    };

    const optionalCallbackParams: any[] = [];
    if (this.passReqToCallback) {
      optionalCallbackParams.push(req);
    }
    this.verify(authorization, verified, ...optionalCallbackParams);
  }
}
