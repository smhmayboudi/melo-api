import { Strategy as PassportStrategy } from "passport-strategy";
import { Request } from "express";

export class Strategy extends PassportStrategy {
  name: string;
  verify: (
    authorization: any,
    verified: (
      err: Error | null,
      user?: Record<string, any>,
      info?: Record<string, any>
    ) => void,
    req?: Request
  ) => void;
  passReqToCallback: boolean;

  constructor(
    verify: (
      authorization: any,
      verified: (
        err: Error | null,
        user?: Record<string, any>,
        info?: Record<string, any>
      ) => void,
      req?: Request
    ) => void,
    passReqToCallback: boolean
  ) {
    super();
    this.name = "anonymId";
    this.verify = verify;
    this.passReqToCallback = passReqToCallback || false;
  }

  authenticate(req: Request, _options?: Record<string, any>): void {
    const authorization = req.headers.authorization;
    const verified = (
      err: Error | null,
      user?: Record<string, any>,
      info?: Record<string, any>
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
