import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import express from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AtService } from "../at/at.service";
import { JwksService } from "../jwks/jwks.service";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { authConstant } from "./auth.constant";
import { AuthJwtPayloadDto } from "./dto/auth.jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly atService: AtService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    protected readonly rtService: RtService
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
          if (jwksEntity === undefined) {
            done(new Error(authConstant.errors.secretOrKeyProvider), null);
          } else {
            done(null, jwksEntity.public_key);
          }
        } catch (error) {
          done(error, null);
        }
      }
    });
  }

  async validate(dto: AuthJwtPayloadDto): Promise<AuthJwtPayloadDto> {
    const sub = parseInt(dto.sub, 10);
    const rtEntity = await this.rtService.validateBySub(sub);
    if (rtEntity === undefined) {
      throw new UnauthorizedException();
    }
    const atEntity = await this.atService.validateByToken(dto.jti);
    if (
      atEntity !== undefined &&
      this.authConfigService.jwtAccessTokenExpiresCount - 1 < atEntity.count
    ) {
      throw new UnauthorizedException();
    }
    if (atEntity !== undefined) {
      await this.atService.update({ ...atEntity, count: atEntity.count + 1 });
    } else {
      await this.atService.save({
        count: 1,
        created_at: new Date(1000 * dto.iat),
        expire_at: new Date(1000 * dto.exp),
        id: 0,
        user_id: sub,
        token: dto.jti
      });
    }
    return Promise.resolve({ ...dto });
  }
}
