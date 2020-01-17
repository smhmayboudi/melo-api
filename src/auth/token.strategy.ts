import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { JwtPayload } from "./type/JwtPayload";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    private readonly rtService: RtService
  ) {
    super({
      rtField: "token",
      rtQuery: "token",
      rtParams: "token",
      rtHeader: "token",
      passReqToCallback: false,
      caseSensitive: true,
      failOnMissing: true
    });
  }

  async validate(token: string): Promise<JwtPayload> {
    const rtEntity = await this.rtService.validateByToken(token);
    if (rtEntity !== undefined && new Date() < rtEntity.expire_at) {
      return {
        exp: 0,
        iat: 0,
        jti: "0",
        sub: rtEntity.user_id.toString()
      };
    }
    throw new UnauthorizedException();
  }
}
