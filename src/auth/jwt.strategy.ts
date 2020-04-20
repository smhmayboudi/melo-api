import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AtService } from "../at/at.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthJwtPayloadReqDto } from "./dto/req/auth.jwt-payload.req.dto";
import { AuthStrategyResDto } from "./dto/res/auth.strategy.res";
import { JwksService } from "../jwks/jwks.service";
import { PassportStrategy } from "@nestjs/passport";
import { RtService } from "../rt/rt.service";
import { authConstant } from "./auth.constant";
import express from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly atService: AtService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    protected readonly rtService: RtService
  ) {
    super({
      algorithms: "RS256",
      jsonWebTokenOptions: {
        algorithms: "RS256",
      },
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      secretOrKeyProvider: async function (
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
            done(
              new Error(authConstant.errors.jwtStrategy.secretOrKeyProvider),
              null
            );
          } else {
            done(null, jwksEntity.public_key);
          }
        } catch (error) {
          done(error, null);
        }
      },
    });
  }

  async validate(dto: AuthJwtPayloadReqDto): Promise<AuthStrategyResDto> {
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
        token: dto.jti,
        user_id: sub,
      });
    }
    return Promise.resolve({ sub: dto.sub });
  }
}
