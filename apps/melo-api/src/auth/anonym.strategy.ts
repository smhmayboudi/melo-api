/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy as PassportStrategy } from "passport-strategy";
import fastify from "fastify";

export class Strategy extends PassportStrategy {
  name: string;
  verify: (
    authorization: string | undefined,
    verified: (
      error: Error | null,
      user?: Record<string, unknown>,
      info?: Record<string, unknown>
    ) => void,
    req?: fastify.FastifyRequest
  ) => void;
  passReqToCallback: boolean;

  verified: (
    error: Error | null,
    user?: Record<string, unknown>,
    info?: Record<string, unknown>
  ) => void = (
    error: Error | null,
    user?: Record<string, unknown>,
    info?: Record<string, unknown>
  ) => {
    if (error) {
      return this.error(error);
    }
    this.success(user, info);
  };

  constructor(
    verify: (
      authorization: string | undefined,
      verified: (
        error: Error | null,
        user?: Record<string, unknown>,
        info?: Record<string, unknown>
      ) => void,
      req?: fastify.FastifyRequest
    ) => void,
    passReqToCallback: boolean
  ) {
    super();
    this.name = "anonymId";
    this.verify = verify;
    this.passReqToCallback = passReqToCallback || false;
  }

  authenticate(
    req: { headers: { authorization?: string } },
    _options?: Record<string, unknown>
  ): void {
    const authorization = req.headers.authorization;
    let optionalCallbackParams: any[] = [];
    if (this.passReqToCallback) {
      optionalCallbackParams = [...optionalCallbackParams, req];
    }
    this.verify(authorization, this.verified, ...optionalCallbackParams);
  }
}
