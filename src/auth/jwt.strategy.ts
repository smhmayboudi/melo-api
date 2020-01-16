import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as express from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwksService } from "src/jwks/jwks.service";
import { AuthConfigService } from "./auth.config.service";
import { Payload } from "./type/Payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService
  ) {
    super({
      algorithms: ["RS256"],
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      secretOrKeyProvider: async function(
        _request: express.Request,
        rawJwtToken: string,
        done: (error: Error | null, publicKey: string | null) => void
      ) {
        try {
          const jwks = await jwksService.findOne(
            JSON.parse(
              Buffer.from(rawJwtToken.split(".")[0], "base64").toString("ascii")
            ).kid
          );
          if (jwks !== undefined) {
            done(null, jwks.public_key);
          } else {
            done(new Error("jwt.strategy secretOrKeyProvider failed."), null);
          }
        } catch (error) {
          done(error, null);
        }
      }
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    return Promise.resolve(payload);
  }
}
