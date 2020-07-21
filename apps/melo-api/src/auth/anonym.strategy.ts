import * as express from "express";
import * as passport from "passport-strategy";

export interface StrategyOptions {
  [key: string]: any;
}
export interface StrategyOptionsWithRequest {
  [key: string]: any;
  passReqToCallback: true;
}
export interface VerifyOptions {
  message?: string;
}

type DoneCallback = (error: any, user?: any, options?: VerifyOptions) => void;
export interface VerifyFunctionWithRequest {
  (req: express.Request, token: string, done: DoneCallback): void;
}
export interface VerifyFunction {
  (token: string, done: DoneCallback): void;
}

export class Strategy extends passport.Strategy {
  name: string;
  passReqToCallback: boolean;
  verify: any;

  constructor(
    options: StrategyOptionsWithRequest,
    verify: VerifyFunctionWithRequest
  );
  constructor(options: StrategyOptions, verify: VerifyFunction);
  constructor(verify: VerifyFunction);
  constructor(options: any, verify?: any) {
    super();
    if (typeof options === "function") {
      verify = options;
      options = {};
    }
    if (verify === undefined) {
      throw new TypeError(
        "AnonymId authentication strategy requires a verify function."
      );
    }
    this.name = "anonymId";
    this.verify = verify;
    this.passReqToCallback = options.passReqToCallback || false;
  }

  authenticate(req: express.Request, _options: VerifyOptions = {}): void {
    const authorization = req.headers.authorization;
    const verifiedCallback = (err: Error, user: any, info: any): void => {
      if (err) {
        return this.error(err);
      }
      return this.success(user, info);
    };
    try {
      return this.passReqToCallback
        ? this.verify(authorization, req, verifiedCallback)
        : this.verify(authorization, verifiedCallback);
    } catch (e) {
      return this.error(e);
    }
  }
}
