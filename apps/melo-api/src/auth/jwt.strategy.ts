import { AuthJwtPayloadReqDto, AuthStrategyResDto } from "@melo/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AtService } from "../at/at.service";
import { AuthConfigService } from "./auth.config.service";
import { JwksService } from "../jwks/jwks.service";
import { PassportStrategy } from "@nestjs/passport";
import { RtService } from "../rt/rt.service";
import fastify from "fastify";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly atService: AtService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    private readonly rtService: RtService
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
        _request: fastify.FastifyRequest,
        rawJwtToken: string,
        done: (error: Error | null, publicKey: string | null) => void
      ) {
        try {
          const id = JSON.parse(
            Buffer.from(rawJwtToken.split(".")[0], "base64").toString("ascii")
          ).kid;
          const jwks = await jwksService.findOne({
            id,
          });
          if (jwks === undefined) {
            done(new Error("jwt.strategy secretOrKeyProvider failed."), null);
          } else {
            done(null, jwks.public_key);
          }
        } catch (error) {
          done(error, null);
        }
      },
    });
  }

  async validate(dto: AuthJwtPayloadReqDto): Promise<AuthStrategyResDto> {
    const sub = parseInt(dto.sub, 10);
    const rt = await this.rtService.validate({
      sub,
    });
    if (rt === undefined) {
      throw new UnauthorizedException();
    }
    const at = await this.atService.validateByToken({
      token: dto.jti,
    });
    if (
      at !== undefined &&
      this.authConfigService.jwtAccessTokenExpiresCount - 1 < at.count
    ) {
      throw new UnauthorizedException();
    }
    if (at !== undefined) {
      await this.atService.update({
        ...at,
        count: at.count + 1,
      });
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
    return Promise.resolve({
      sub: dto.sub,
    });
  }
}
