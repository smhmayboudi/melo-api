import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "./dto/res/auth.strategy.res.to";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "./anonym.strategy";

@Injectable()
export class AnonymUUIDStrategy extends PassportStrategy(Strategy) {
  async validate(
    authorization: string | undefined
  ): Promise<AuthStrategyResDto> {
    if (authorization === undefined) {
      return Promise.resolve({
        sub: "0",
      });
    }
    throw new UnauthorizedException();
  }
}
