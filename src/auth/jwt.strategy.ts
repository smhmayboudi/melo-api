import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as express from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwksService } from "src/jwks/jwks.service";
import { AuthConfigService } from "./auth.config.service";
import { Payload } from "./type/Payload";
import { TokenService } from "src/token/token.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    protected readonly tokenService: TokenService
  ) {
    super({
      // audience?: string;
      algorithms: "RS256",
      // ignoreExpiration?: boolean;
      // issuer?: string;
      jsonWebTokenOptions: {
        algorithms: "RS256"
        // audience?: string | string[];
        // clockTimestamp?: number;
        // clockTolerance?: number;
        // ignoreExpiration?: boolean;
        // ignoreNotBefore?: boolean;
        // issuer?: string | string[];
        // jwtid?: string;
        // subject?: string;
      },
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      // secretOrKey?: string | Buffer;
      secretOrKeyProvider: async function(
        _request: express.Request,
        rawJwtToken: string,
        done: (error: Error | null, publicKey: string | null) => void
      ) {
        try {
          const jwksEntity = await jwksService.findOneById(
            JSON.parse(
              Buffer.from(rawJwtToken.split(".")[0], "base64").toString("ascii")
            ).kid
          );
          if (jwksEntity !== undefined) {
            done(null, jwksEntity.public_key);
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
    const tokenEntity = await this.tokenService.validateByUserId(payload.uid);
    if (tokenEntity !== undefined) {
      return Promise.resolve({ ...payload });
    }
    throw new UnauthorizedException();
  }
}
