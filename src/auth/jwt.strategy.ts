import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as express from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AtService } from "../at/at.service";
import { JwksService } from "../jwks/jwks.service";
import { TokenService } from "../token/token.service";
import { AuthConfigService } from "./auth.config.service";
import { JwtPayload } from "./type/JwtPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    protected readonly atService: AtService,
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

  async validate(jwtPayload: JwtPayload): Promise<JwtPayload> {
    const tokenEntity = await this.tokenService.validateByUserId(
      parseInt(jwtPayload.sub, 10)
    );
    if (tokenEntity !== undefined) {
      const atEnity = await this.atService.validateByToken(jwtPayload.jti);
      if (atEnity === undefined) {
        await this.atService.save([
          {
            create_at: new Date(1000 * jwtPayload.iat),
            expire_at: new Date(1000 * jwtPayload.exp),
            id: 0,
            user_id: parseInt(jwtPayload.sub, 10),
            token: jwtPayload.jti
          }
        ]);
        return Promise.resolve({ ...jwtPayload });
      }
    }
    throw new UnauthorizedException();
  }
}
