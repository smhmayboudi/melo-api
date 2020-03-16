import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "./dto/res/auth.strategy.res.to";
import { PassportStrategy } from "@nestjs/passport";
import { RtService } from "../rt/rt.service";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly rtService: RtService) {
    super({
      caseSensitive: true,
      failOnMissing: true,
      passReqToCallback: false,
      rtField: "token",
      rtHeader: "token",
      rtParams: "token",
      rtQuery: "token"
    });
  }

  async validate(token: string): Promise<AuthStrategyResDto> {
    const rtEntity = await this.rtService.validateByToken(token);
    if (rtEntity === undefined || rtEntity.expire_at < new Date()) {
      throw new UnauthorizedException();
    }
    return {
      sub: rtEntity.user_id.toString()
    };
  }
}
