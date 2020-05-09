import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "./dto/res/auth.strategy.res";
import { PassportStrategy } from "@nestjs/passport";
import { REQUEST_USER_SUB_ANONYMOUS_ID } from "../app/app.constant";
import { Strategy } from "./anonym.strategy";

@Injectable()
export class AnonymUUIDStrategy extends PassportStrategy(Strategy) {
  async validate(
    authorization: string | undefined
  ): Promise<AuthStrategyResDto> {
    if (authorization === undefined) {
      return Promise.resolve({
        sub: REQUEST_USER_SUB_ANONYMOUS_ID,
      });
    }
    throw new UnauthorizedException();
  }
}
